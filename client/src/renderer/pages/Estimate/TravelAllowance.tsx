import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import moment from 'moment';

interface Row {
  id: number;
  鉄道名: string;
  路線名: string;
  利用区間_: string;
  利用区間: string;
  マンスリーチケット: number;
  往復: number;
  備考: string;
  合計: number;
}


export default function TravelAllowance(props) {


  const { callback } = props;



  const currentDate = moment().format('YYYY/MM/DD HH:mm:ss');

  const initialRows = callback ? callback.map((item: { id: any; 鉄道名: any; 路線名: any; 利用区間_: any; 利用区間: any; マンスリーチケット: any; 往復: any; 備考: any; 合計: any; }) => ({
    id: item.id,
    鉄道名: item.鉄道名,
    路線名: item.路線名,
    利用区間_: item.利用区間_,
    利用区間: item.利用区間,
    マンスリーチケット: item.マンスリーチケット,
    往復: item.往復,
    備考: item.備考,
    合計: item.合計,


  })) : [{ id: 0, 鉄道名: '', 路線名: '', 利用区間_: '', 利用区間: '', マンスリーチケット: 0, 往復: 0, 備考: '', 合計: 0 }];


  const [rows, setRows] = useState(initialRows);
  // const [isNew, setNew] = useState(1);
  // const [isChange, setChange] = useState(0);
  // const [isChangePrice, setChangePrice] = useState(0);
  // const [isStartNow, setIsStartNow] = useState(false);
  // const [isStartDate, setIsStartDate] = useState(false);

  // const handleLeaveDateChange = (_date: DateObject | DateObject[] | null) => {
  //   const newRows = [...rows];
  //   setRows(newRows);
  // };
  // const handleNewCheck = () => {
  //   setNew(isNew === 2 ? 0 : isNew + 1);
  //   if (isChange === 1) setChange(0); // Bỏ chọn nếu nút trễ đã được chọn
  //   if (isChangePrice === 1) setChangePrice(0);
  // };

  // const handleisChangeCheck = () => {
  //   setChange(isChange === 2 ? 0 : isChange + 1);
  //   if (isNew === 1) setNew(0); // Bỏ chọn nếu nút sớm đã được chọn
  //   if (isChangePrice === 1) setChangePrice(0);
  // };

  // const handleChangePriceCheck = () => {
  //   setChangePrice(isChangePrice === 2 ? 0 : isChangePrice + 1);
  //   if (isNew === 1) setNew(0); // Bỏ chọn nếu nút sớm đã được chọn
  //   if (isChange === 1) setChange(0); // Bỏ chọn nếu nút trễ đã được chọn
  // };
  // const handleStartNowCheck = () => {
  //   setIsStartNow(!isStartNow);
  //   if (isStartDate) setIsStartDate(false);
  // };
  // const handleStartDateCheck = () => {
  //   setIsStartDate(!isStartDate);
  //   if (isStartNow) setIsStartNow(false);
  // };

  const monthlyticketses = callback ? callback.map((item: { マンスリーチケット: { toLocaleString: () => any; }; }) => item.マンスリーチケット.toLocaleString()) : new Array(rows.length).fill('');
  const roundtripses = callback ? callback.map((item: { 往復: { toLocaleString: () => any; }; }) => item.往復.toLocaleString()) : new Array(rows.length).fill('');


  const [monthlyticket, setmonthlyticket] = useState<string[]>(monthlyticketses);
  const [roundtrip, setroundtrip] = useState<string[]>(roundtripses);

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'マンスリーチケット' | '往復',
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
      const totalTaxIncluded = Number(monthlyticket) + Number(roundtrip);
      const newRowsWithTotal = newRows.map(row => ({ ...row, 合計: totalTaxIncluded }));
      props.parentCallback(newRowsWithTotal); // callback props ve cha
    }

    if (field === 'マンスリーチケット') {
      const newmonthlyticket = [...monthlyticket];
      newmonthlyticket[index] = formattedValue;
      newRows[index].合計 = calculateRowTotal(newRows[index]);
      setmonthlyticket(newmonthlyticket);
    } else if (field === '往復') {
      const newroundtrip = [...roundtrip];
      newroundtrip[index] = formattedValue;
      newRows[index].合計 = calculateRowTotal(newRows[index]);
      setroundtrip(newroundtrip);
    }
  };


  const [total, setTotal] = useState(0);
  const calculateRowTotal = (row: Row) => {
    return row.マンスリーチケット + row.往復; // Tạm thời chỉ tính tổng từ trường mealExpense
  };

  useEffect(() => {
    calculateTotal(rows);
  }, [rows]);

  const calculateTotal = (rows: Row[]) => {
    let sum = 0;
    rows.forEach(row => {
      sum += row.マンスリーチケット + row.往復;
    });
    setTotal(sum); // Cập nhật state total

    // Tính tổng của tất cả các hàng
    let totalRowsSum = 0;
    rows.forEach(row => {
      totalRowsSum += row.合計;
    });

    return sum;
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
  // const handleInputChange02 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   if (name === 'address') {
  //     setAddress(value);
  //     // Thực hiện các xử lý khác dựa trên giá trị mới của address
  //   } else {
  //     setstation(value);
  //   }
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
    const { value } = event.target;
    setRows((prevRows: Row[]) => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], [field]: value };

      const totalTaxIncluded = Number(monthlyticket) + Number(roundtrip);
      const newRowsWithTotal = newRows.map(row => ({ ...row }));
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
    const newRow = { id: rows.length, 鉄道名: '', 路線名: '', 利用区間_: '', 利用区間: '', マンスリーチケット: 0, 往復: 0, 備考: '', 合計: 0 };
    setRows([...rows, newRow]);
  };


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
                <th>1ヵ月の定期代 <br />(普通運賃往復の場合)</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr>
                  <td>
                    <input
                      type="text"
                      value={row.鉄道名}
                      onChange={(e) =>
                        handleInputChange(e, index, '鉄道名')
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.路線名}
                      onChange={(e) => handleInputChange(e, index, '路線名')}
                    />
                  </td>
                  <td>
                    {' '}
                    <p className="grid-row grid--flex">
                      {' '}
                      <input
                        className="width_auto"
                        type="text"
                        value={row.利用区間_}
                        onChange={(e) =>
                          handleInputChange(e, index, '利用区間_')
                        }
                      />{' '}
                      ↔{' '}
                      <input
                        className="width_auto"
                        type="text"
                        value={row.利用区間}
                        onChange={(e) => handleInputChange(e, index, '利用区間')}
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
                        handleNumberChange(e, index, 'マンスリーチケット')
                      }
                    />
                    <input
                      className="numberInput"
                      type="text"
                      placeholder="税率を入力"
                      value={roundtrip[index]}
                      onChange={(e) =>
                        handleNumberChange(e, index, '往復')
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_noboder "
                      value={row.備考}
                      onChange={(e) => handleInputChange(e, index, '備考')}
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
    </>
  );
};
