import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const Business = ({ id }) => {
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
              <span className="box-register__item__title">項目</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].project : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">交通費</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].priceTrain : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">宿泊費</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].priceHouse : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">交際費</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0
                  ? accordionItems[0].priceCustomer
                  : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">食費</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].priceEat : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">その他</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].priceOther : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">合計</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].totalPrice : ''}
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
