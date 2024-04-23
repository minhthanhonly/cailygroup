import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';
import { Report } from './report';
import { Expense } from './expense';
import { Business } from './business';
import { Travelallowance } from './travelallowance';
import { Register } from './register';
import { Approvalstatus } from './approvalstatus';

export const TabContent = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [approve, setApprove] = useState({
    approveTexts: '',
    approveClass: '',
    statusattrTexts: '',
    statusattrClass: '',
  });

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const Load = async () => {
      try {
        const response = await axiosPrivate.get('application/getforid/' + id);
        const data = response.data;
        const parsedTableJson = JSON.parse(data.tablejson);
        const itemWithStatus = {
          ...parsedTableJson.rows[0], // Giữ nguyên các trường từ dữ liệu cũ
          id_status: data.id_status, // Thêm trường id_status vào dữ liệu
        };
        setAccordionItems(itemWithStatus);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    Load();
  }, [id]);

  useEffect(() => {
    if (accordionItems.id_status == 1) {
      setApprove({
        approveTexts: '承認待ち',
        approveClass: 'lbl01 lbl-blue',
        statusattrTexts: '承認待ち',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else if (accordionItems.id_status == 2) {
      setApprove({
        approveTexts: '差し戻し',
        approveClass: 'lbl01 lbl-yellow',
        statusattrTexts: '差し戻し',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else if (accordionItems.id_status == 3) {
      setApprove({
        approveTexts: '却下',
        approveClass: 'lbl01 lbl-red',
        statusattrTexts: '却下',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else if (accordionItems.id_status == 4) {
      setApprove({
        approveTexts: '完了',
        approveClass: 'lbl01 lbl-white',
        statusattrTexts: '承認済み',
        statusattrClass: 'lbl01 lbc-blue lbbd-blue',
      });
    } else if (accordionItems.id_status == 5) {
      setApprove({
        approveTexts: '下書き',
        approveClass: 'lbl01 lbl-brown',
        statusattrTexts: '下書き',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else {
      setApprove({
        approveTexts: '取り消し',
        approveClass: 'lbl01',
        statusattrTexts: '取り消し',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    }
  }, [accordionItems]);

  return (
    <>
      <div className="list-accordion__parent">
        <div className={`list-accordion__item ${isOpen ? 'open' : ''}`}>
          <div className="list-accordion__item__head" onClick={toggleAccordion}>
            <div className="list-accordion__item__head__title">
              <p className="list-accordion__item__head__title__title">
                {accordionItems.tableName}
              </p>
              <span className="list-accordion__item__head__title__subtitle">
                {accordionItems.owner}（{accordionItems.date} ）
              </span>
            </div>
            <div className="list-accordion__item__head__btn">
              <p className="list-accordion__item__head__btn__btn">
                <span className={approve.approveClass}>
                  {approve.approveTexts}
                </span>
              </p>
              <p className="list-accordion__item__head__btn__icn">
                <span className="icn-item">
                  <img src={editIcon} alt="edit" className="fluid-image" />
                </span>
                <span className="icn-item">
                  <img src={closeIcon} alt="close" className="fluid-image" />
                </span>
              </p>
            </div>
          </div>
          <div className="list-accordion__item__content">
            {isOpen && (
              <div className="list-accordion__item__content__inner">
                <div className="list-accordion__item__content__item">
                  {accordionItems.table_id === 6 ? (
                    <Register id={id} />
                  ) : accordionItems.table_id === 7 ? (
                    <Expense id={id} />
                  ) : accordionItems.table_id === 8 ? (
                    <Report id={id} />
                  ) : accordionItems.table_id === 9 ? (
                    <Business id={id} />
                  ) : (
                    <Travelallowance id={id} />
                  )}
                  <Approvalstatus id={id} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
