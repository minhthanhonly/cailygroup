import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import moment from 'moment';

interface Row {
  id: number;
  date: string;
  railwayName: string;
  router: string;
  startroad: string;
  endroad: string;
  monthlyticket: number;
  roundtrip: number;
  note: string;
}


export const TravelAllowance = (props: { id_table: any }) => {
  const { id_table } = props;

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const axiosPrivate = useAxiosPrivate();
  const [rows, setRows] = useState([
    {
      date: '',
      id: 0,
      railwayName: '',
      router: '',
      startroad: '',
      endroad: '',
      monthlyticket: 0,
      roundtrip: 0,
      note: '',
    },
  ]);
  const [isNew, setNew] = useState(1);
  const [isChange, setChange] = useState(0);
  const [isChangePrice, setChangePrice] = useState(0);
  const [isStartNow, setIsStartNow] = useState(false);
  const [isStartDate, setIsStartDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleLeaveDateChange = (_date: DateObject | DateObject[] | null) => {
    const newRows = [...rows];
    setRows(newRows);
  };
  const handleNewCheck = () => {
    setNew(isNew === 2 ? 0 : isNew + 1);
    if (isChange === 1) setChange(0); // Bỏ chọn nếu nút trễ đã được chọn
    if (isChangePrice === 1) setChangePrice(0);
  };

  const handleisChangeCheck = () => {
    setChange(isChange === 2 ? 0 : isChange + 1);
    if (isNew === 1) setNew(0); // Bỏ chọn nếu nút sớm đã được chọn
    if (isChangePrice === 1) setChangePrice(0);
  };

  const handleChangePriceCheck = () => {
    setChangePrice(isChangePrice === 2 ? 0 : isChangePrice + 1);
    if (isNew === 1) setNew(0); // Bỏ chọn nếu nút sớm đã được chọn
    if (isChange === 1) setChange(0); // Bỏ chọn nếu nút trễ đã được chọn
  };
  const handleStartNowCheck = () => {
    setIsStartNow(!isStartNow);
    if (isStartDate) setIsStartDate(false);
  };
  const handleStartDateCheck = () => {
    setIsStartDate(!isStartDate);
    if (isStartNow) setIsStartNow(false);
  };

  const [monthlyticket, setmonthlyticket] = useState<string[]>(
    new Array(rows.length).fill(''),
  );
  const [roundtrip, setroundtrip] = useState<string[]>(
    new Array(rows.length).fill(''),
  );

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'monthlyticket' | 'roundtrip',
  ) => {
    let inputValue = event.target.value;
    // Loại bỏ các ký tự không phải số
    inputValue = inputValue.replace(/[^0-9]/g, '');

    // Kiểm tra xem giá trị sau khi loại bỏ ký tự không phải số có là chuỗi rỗng không
    if (inputValue === '') {
      // Nếu là chuỗi rỗng, có thể gán giá trị là 0 hoặc bất kỳ giá trị mặc định khác tùy theo yêu cầu của bạn
      inputValue = '0';
    }

    const newValue = parseInt(inputValue, 10);
    const formattedValue = newValue.toLocaleString();

    const newRows: Row[] = [...rows];
    const rowToUpdate = newRows[index];
    if (rowToUpdate) {
      rowToUpdate[field] = newValue;
      setRows(newRows);
    }

    if (field === 'monthlyticket') {
      const newmonthlyticket = [...monthlyticket];
      newmonthlyticket[index] = formattedValue;
      setmonthlyticket(newmonthlyticket);
    } else if (field === 'roundtrip') {
      const newroundtrip = [...roundtrip];
      newroundtrip[index] = formattedValue;
      setroundtrip(newroundtrip);
    }
  };

  const formatNumberWithCommas = (value: number) => {
    const formattedValue = value.toLocaleString('en-US', {
      maximumFractionDigits: 20,
    });
    // Sau đó, thay thế các dấu phẩy bằng dấu phẩy trong chuỗi đã được định dạng
    return formattedValue.replace(/,/g, ',');
  };

  const [address, setAddress] = useState('');
  const [station, setstation] = useState('');
  const handleInputChange02 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'address') {
      setAddress(value);
      // Thực hiện các xử lý khác dựa trên giá trị mới của address
    } else {
      setstation(value);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Row,
  ) => {
    const { value } = event.target;
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], [field]: value };
      return newRows;
    });

    //   validateInput(value, field, index); // Truyền index vào hàm validateInput
  };

  const saveAsDraft = async () => {
    await saveExpense(3); // Trạng thái cho bản nháp
  };

  const saveAsAwaitingApproval = async () => {
    await saveExpense(1); // Trạng thái cho đang chờ duyệt
  };

  const calculateTotalSum = (array: number[]) => {
    const validValues = array.filter((value) => !isNaN(value)); // Lọc các giá trị không phải là số
    return validValues.reduce((total, value) => total + value, 0);
  };

  // Tính tổng cho monthlyticket và roundtrip
  const totalMonthlyTicket = calculateTotalSum(
    monthlyticket.map((value) => parseInt(value.replace(/,/g, ''), 10)),
  );
  const totalRoundtrip = calculateTotalSum(
    roundtrip.map((value) => parseInt(value.replace(/,/g, ''), 10)),
  );

  const addRow = () => {
    const newRow = {
      id: rows.length,
      date: '',
      railwayName: '',
      router: '',
      startroad: '',
      endroad: '',
      monthlyticket: 0,
      roundtrip: 0,
      note: '',
    };
    setRows([...rows, newRow]);
  };

  const [tableName, setTableName] = useState(0);
  useEffect(() => {
    const getTables = async () => {
      try {
        const response = await axiosPrivate.get('estimate');
        const { data } = response;
        const { id_table } = props;

        // Lặp qua mảng data để tìm name tương ứng với id_table
        const matchedTable = data.find(
          (data: { id: any }) => data.id === id_table,
        );
        setTableName(matchedTable.name);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
      }
    };
    getTables();
  }, [id_table]);


  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatNumberWithCommass = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const saveExpense = async (status: number) => {
    const formattedDate = moment(date).format('YYYY/MM/DD HH:mm:ss');
    const fDateChanged = isStartDate === true ? formattedDate : '';

    try {
      const additionalData = {
        isChange: isChange,
        isChangePrice: isChangePrice,
        isStartNow: isStartNow,
        isStartDate: isStartDate,
        date_input: fDateChanged,
        totalMonthlyTicket: formatNumberWithCommass(totalMonthlyTicket),
        totalRoundtrip: formatNumberWithCommass(totalRoundtrip),
        // Thêm các trường khác nếu cần
      };
      // Tạo mảng các đối tượng JSON đại diện cho mỗi hàng dữ liệu
      const dataToSend = rows.map((row, index) => ({
        date: formattedDate,
        railwayName: row.railwayName,
        router: row.router,
        startroad: row.startroad,
        endroad: row.endroad,
        monthlyticket: formatNumberWithCommass(row.monthlyticket),
        roundtrip: formatNumberWithCommass(row.roundtrip),
        owner: users.realname,
        note: row.note,
        address: address,
        isNew: isNew,
        station: station,
        tableName: tableName,
        table_id: id_table,
        id_status: status,
      }));

      // Tạo đối tượng JSON chứa các mảng dữ liệu
      const requestData = {
        rows: dataToSend,
        owner: users.realname,
        table_id: id_table,
        id_status: status,
        ...additionalData,
      };

      console.log("rowsObject", requestData);

      // Gửi yêu cầu POST với dữ liệu được định dạng theo yêu cầu
      // const response = await axiosPrivate.post(
      //   'travelexpenses/add',
      //   requestData,
      //   { headers: { 'Content-Type': 'application/json' } },
      // );

      // if (response.status >= 200 && response.status < 300) {
      //   if (status === 1) {
      //     toast.success('Bạn đã gởi thông tin thành công vui lòng chờ');
      //   } else {
      //     toast.success('Bạn Lưu vào bản nháp thành công');
      //   }
      // } else {
      //   console.error(
      //     'Yêu cầu POST không thành công. Mã lỗi:',
      //     response.status,
      //   );
      // }
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };
  return (
    <>
      {/* <h2 className="hdglv2">
        <span>通勤手当申請書</span>
      </h2>
      <p className="txt-lead">下記の通り申請致します。</p> */}

      {/* <table className="tb-from">
        <tbody>
          <tr>
            <th>
              <div className="tb-from--th">
                用途<span className="txt-red">（必須）</span>
              </div>
            </th>
            <td>
              <div className="tb-from--td">
                <div className="tb-from--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="checkbox"
                      checked={isNew}
                      onChange={handleNewCheck}
                    />
                    <span></span>遅刻
                  </label>
                </div>
                <div className="tb-from--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="checkbox"
                      checked={isChange}
                      onChange={handleisChangeCheck}
                    />
                    <span></span>早退
                  </label>
                </div>
                <div className="tb-from--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="checkbox"
                      checked={isChangePrice}
                      onChange={handleChangePriceCheck}
                    />
                    <span></span>時間外勤務
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <div className="tb-from--th">
                行先<span className="txt-red">（必須）</span>
              </div>
            </th>
            <td>
              <div className="tb-from--td">
                <input
                  type="text"
                  className="tb-from--input"
                  name="address"
                  value={address}
                  onChange={handleInputChange02}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <div className="tb-from--th">
                行先<span className="txt-red">（必須）</span>
              </div>
            </th>
            <td>
              <div className="tb-from--td">
                <input
                  type="text"
                  className="tb-from--input"
                  name="station"
                  value={station}
                  onChange={handleInputChange02}
                />
              </div>
            </td>
          </tr>
          <tr>
            {' '}
            <th>
              {' '}
              <div className="tb-from--th">
                適用開始年月日<span className="txt-red">（必須）</span>{' '}
              </div>{' '}
            </th>
            <td>
              <div className="tb-from--td">
                <div className="tb-from--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="checkbox"
                      checked={isStartNow}
                      onChange={handleStartNowCheck}
                    />
                    <span></span>入社日から適用
                  </label>
                </div>
                <div className="tb-from--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="checkbox"
                      checked={isStartDate}
                      onChange={handleStartDateCheck}
                    />
                    <span></span>
                    <DatePicker
                      className="tb-from--checkbox__date"
                      onChange={(_date) => handleLeaveDateChange()}
                      value={date}
                      format="YYYY/MM/DD HH:mm:ss"
                    />
                    <p>から適用</p>
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <div className="tb-from--th">
                行先<span className="txt-red">（必須）</span>
              </div>
            </th>
            <td>
              【時給制の場合】普通運賃の勤務日数分を支給　　【月給制の場合】1ヵ月分の定期券代金を支給
            </td>
          </tr>
        </tbody>
      </table> */}
      <div className="table ">
        <div className="tbl_custom--03 boder-input">
          <table>
            <thead>
              <tr>
                <th>鉄道名</th>
                <th>路線名</th>
                <th className="w500">利用区間</th>
                <th>
                  1ヵ月の定期代 <br />
                  (普通運賃往復の場合)
                </th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (

                <tr>
                  <td>
                    {showDatePicker && (
                      <DatePicker
                        onChange={(_date) => handleLeaveDateChange(_date)}
                        value={date}
                        format="YYYY-MM-DD HH:mm:ss"
                      />
                    )}
                    <input
                      type="text"
                      value={row.railwayName}
                      onChange={(e) =>
                        handleInputChange(e, index, 'railwayName')
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.router}
                      onChange={(e) => handleInputChange(e, index, 'router')}
                    />
                  </td>
                  <td>
                    {' '}
                    <p className="grid-row grid--flex">
                      {' '}
                      <input
                        className="width_auto"
                        type="text"
                        value={row.startroad}
                        onChange={(e) =>
                          handleInputChange(e, index, 'startroad')
                        }
                      />{' '}
                      ↔{' '}
                      <input
                        className="width_auto"
                        type="text"
                        value={row.endroad}
                        onChange={(e) => handleInputChange(e, index, 'endroad')}
                      />
                    </p>
                  </td>
                  <td>
                    <input
                      className="numberInput"
                      type="text"
                      placeholder="税率を入力"
                      value={monthlyticket[index]}
                      onChange={(e) =>
                        handleNumberChange(e, index, 'monthlyticket')
                      }
                    />
                    <input
                      className="numberInput"
                      type="text"
                      placeholder="税率を入力"
                      value={roundtrip[index]}
                      onChange={(e) =>
                        handleNumberChange(e, index, 'roundtrip')
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_noboder "
                      value={row.note}
                      onChange={(e) => handleInputChange(e, index, 'note')}
                      placeholder="入力してください"
                      type="text"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p onClick={addRow} className="plus-row">
            {' '}
            行を追加する
          </p>
        </div>
        <div className="tbl_custom--04 tbl_width tbl_right">
          <table>
            <tbody>
              <tr>
                <th className="rowspan" rowSpan={2}>
                  合計
                </th>
                <td>
                  {totalMonthlyTicket !== 0
                    ? formatNumberWithCommas(totalMonthlyTicket)
                    : '0'}
                </td>
              </tr>
              <tr>
                <td>
                  {totalRoundtrip !== 0
                    ? formatNumberWithCommas(totalRoundtrip)
                    : '0'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="box-router">
        <div className="box-router__title">承認ルート</div>
        <div className="grid-row box-router__grid">
          <div className="box-router__name">
            <p>承認者: </p> <p>齋藤社長</p>
          </div>
          <div className="box-router__name">
            <p>共有者: </p> <p>総務</p>
          </div>
        </div>
        <div className="box-router__edit">
          <p className="plus-row box-router__edit--content">承認ルートを編集</p>
        </div>
      </div>
      <div className="wrp-button">
        <button className="btn btn--from btn--gray" onClick={saveAsDraft}>
          下書き保存
        </button>
        <button
          className="btn btn--from btn--blue"
          onClick={saveAsAwaitingApproval}
        >
          申請する
        </button>
      </div> */}
    </>
  );
};
