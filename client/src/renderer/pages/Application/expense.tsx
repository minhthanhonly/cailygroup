import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const Expense = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);
  const [check, setCheck] = useState({
    checkTexts: '',
  });

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

  useEffect(() => {
    if (accordionItems.length > 0 && accordionItems[0].check === 1) {
      setCheck({
        checkTexts: 'Có',
      });
    } else {
      setCheck({
        checkTexts: 'Không',
      });
    }
  }, [accordionItems]);

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
              <span className="box-register__item__title">内容</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].route : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">支払先</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0
                  ? accordionItems[0].paymentDestination
                  : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">金額（税抜）</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].priceNotax : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">消費税</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0
                  ? accordionItems[0].totalPriceTax
                  : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">軽減税率</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? check.checkTexts : ''}
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
