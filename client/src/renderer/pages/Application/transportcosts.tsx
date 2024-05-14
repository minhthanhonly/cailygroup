import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const Transportcosts = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);

  useEffect(() => {
    const Load = async () => {
      try {
        const response = await axiosPrivate.get('application/getforid/' + id);
        const data = response.data;
        const parsedDataJson = JSON.parse(data.datajson);
        console.log(parsedDataJson.tableData);
        setAccordionItems(parsedDataJson);
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
          {accordionItems &&
            accordionItems.tableData &&
            accordionItems.tableData.map((tableDataItem, index) => (
              <li key={index}>
                <div className="box-register__item">
                  <span className="box-register__item__title">date</span>
                  <span className="box-register__item__content">
                    {tableDataItem.date}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
