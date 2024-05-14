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


export default function TravelAllowance(props) {

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
    const { value } = event.target;
    setRows((prevRows: Row[]) => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], [field]: value };

      const newRowsWithTotal = newRows.map(row => ({ ...row, total: totalRoundtrip }));
      props.parentCallback(newRowsWithTotal); // callback props ve cha
      return newRowsWithTotal; // Trả về một giá trị từ hàm setRows
    });
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
    const newRow = { id: rows.length, date: '', railwayName: '', router: '', startroad: '', endroad: '', monthlyticket: 0, roundtrip: 0, note: '', };
    setRows([...rows, newRow]);
  };


  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatNumberWithCommass = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  return (
    <>

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
