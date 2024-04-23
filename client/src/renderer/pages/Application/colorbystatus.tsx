import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Colorbystatus = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);
  const [approve, setApprove] = useState({
    approveTexts: '',
    approveClass: '',
    statusattrTexts: '',
    statusattrClass: '',
  });

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
};

export default Colorbystatus;
