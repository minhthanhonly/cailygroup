import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const Expense = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);
  useEffect(() => {
    const Load = async () => {
      try {
        const response = await axiosPrivate.get('application/getforid/' + id);
        const data = response.data;
        // Parse tablejson thành JSON
        const parsedTableJson = JSON.parse(data.tablejson);
        // Truy cập vào phần tử rows trong parsedTableJson
        const rows = parsedTableJson.rows;
        setAccordionItems(rows);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    Load();
  }, [id]);

  return (
    <>
      <div className="box-register 1">
        <ul>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">期間</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 && accordionItems[0].date
                  ? new Date(accordionItems[0].date).toLocaleDateString('ja-JP')
                  : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">路線</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].route : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">乗車駅</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0
                  ? accordionItems[0].boardingStation
                  : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">下車駅</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0
                  ? accordionItems[0].alightingStation
                  : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">金額</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].total : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">備考</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].note : ''}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
