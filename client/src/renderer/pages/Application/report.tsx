import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const Report = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);

  useEffect(() => {
    const Load = async () => {
      try {
        const response = await axiosPrivate.get('application/getforid/' + id);
        //const data = response.data;
        console.log(response.data);
        setAccordionItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    Load();
  }, []);

  return (
    <>
      <div className="box-register">
        <ul>
          {accordionItems.map((item, index) => (
            <li key={index}>
              <div className="box-register__item">
                <span className="box-register__item__title">期間</span>
                <span className="box-register__item__content">
                  {/* {accordionItems.date} */}
                  {/* Kiểm tra xem item.tablejson có tồn tại */}
                  {item.tablejson
                    ? (() => {
                        try {
                          // Phân tích chuỗi JSON thành đối tượng JavaScript
                          const tableJsonObj = JSON.parse(item.tablejson);
                          // Kiểm tra xem đối tượng đã được phân tích thành công và có mảng rows không
                          if (tableJsonObj && tableJsonObj.rows) {
                            // Truy cập vào phần tử đầu tiên của mảng rows và kiểm tra xem có thuộc tính date không
                            if (
                              tableJsonObj.rows[0] &&
                              tableJsonObj.rows[0].date
                            ) {
                              // Trả về giá trị của thuộc tính date
                              return tableJsonObj.rows[0].date;
                            } else {
                              // Nếu không có thuộc tính date, trả về thông báo không có dữ liệu
                              return 'Không có dữ liệu';
                            }
                          } else {
                            // Nếu không có mảng rows, trả về thông báo không có dữ liệu
                            return 'Không có dữ liệu';
                          }
                        } catch (error) {
                          // Xử lý nếu có lỗi khi phân tích chuỗi JSON
                          console.error('Error parsing JSON:', error);
                          return 'Không có dữ liệu';
                        }
                      })()
                    : // Nếu không có tablejson, trả về thông báo không có dữ liệu
                      'Không có dữ liệu'}
                </span>
              </div>
            </li>
          ))}
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">期間</span>
              <span className="box-register__item__content">
                {/* {accordionItems.date} */}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">路線</span>
              <span className="box-register__item__content">
                {/* {accordionItems.destination} */}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">乗車駅</span>
              <span className="box-register__item__content">
                {/* {accordionItems.destination} */}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">下車駅</span>
              <span className="box-register__item__content">
                {/* {accordionItems.note} */}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">金額</span>
              <span className="box-register__item__content">
                {/* {accordionItems.note} */}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">備考</span>
              <span className="box-register__item__content">
                {/* {accordionItems.note} */}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
