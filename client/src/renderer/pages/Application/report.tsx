import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const Report = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);

  useEffect(() => {
    const Load = async () => {
      try {
        const response = await axiosPrivate.get('application/getforid/' + id);

        const data = response.data;
        const parsedTableJson = JSON.parse(data.tablejson);
        //console.log(parsedTableJson);
        setAccordionItems(parsedTableJson.rows[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    Load();
  }, [id]);

  const formattedDate = accordionItems.date
    ? new Date(accordionItems.date).toLocaleDateString('ja-JP')
    : '';
  return (
    <>
      <div className="box-register 1">
        <ul>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">期間</span>
              <span className="box-register__item__content">
                {formattedDate}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">路線</span>
              <span className="box-register__item__content">
                {accordionItems.route}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">乗車駅</span>
              <span className="box-register__item__content">
                {accordionItems.boardingStation}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">下車駅</span>
              <span className="box-register__item__content">
                {accordionItems.alightingStation}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">金額</span>
              <span className="box-register__item__content">
                {accordionItems.total}
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
