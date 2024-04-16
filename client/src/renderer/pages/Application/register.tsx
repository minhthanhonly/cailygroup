import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const Register = ({ id }) => {
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
      <div className="box-register">
        <ul>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">期間</span>
              <span className="box-register__item__content">
                {accordionItems.date}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">行先</span>
              <span className="box-register__item__content">
                {accordionItems.destination}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">事由</span>
              <span className="box-register__item__content">
                {accordionItems.destination}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">備考</span>
              <span className="box-register__item__content">
                {accordionItems.note}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
