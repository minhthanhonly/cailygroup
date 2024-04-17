import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const Travelallowance = ({ id }) => {
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
    if (accordionItems.length > 0 && accordionItems[0].isNew === 0) {
      setCheck({
        checkTexts: '新規',
      });
    } else if (accordionItems.length > 0 && accordionItems[0].isNew === 1) {
      setCheck({
        checkTexts: '経路変更',
      });
    } else {
      setCheck({
        checkTexts: '運賃改定',
      });
    }
  }, [accordionItems]);

  return (
    <>
      <div className="box-register 1">
        <ul>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">申請理由</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? check.checkTexts : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">現住所</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].address : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">最寄り駅</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].station : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">適用開始年月日</span>
              <span className="box-register__item__content">
                【時給制の場合】普通運賃の勤務日数分を支給　　【月給制の場合】1ヵ月分の定期券代金を支給
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">鉄道名</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].railwayName : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">路線名</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].router : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">利用区間</span>
              <span className="box-register__item__content">
                {accordionItems.length > 0 ? accordionItems[0].startroad : ''} ~{' '}
                {'\u00A0\u00A0'}
                {accordionItems.length > 0 ? accordionItems[0].endroad : ''}
              </span>
            </div>
          </li>
          <li>
            <div className="box-register__item">
              <span className="box-register__item__title">
                1ヵ月の定期代(普通運賃往復の場合)
              </span>
              <span className="box-register__item__content">
                {accordionItems.length > 0
                  ? accordionItems[0].monthlyticket
                  : ''}{' '}
                ~{'\u00A0\u00A0'}
                {accordionItems.length > 0 ? accordionItems[0].roundtrip : ''}
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
