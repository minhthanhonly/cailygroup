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
        const parsedDataJson = JSON.parse(data.datajson);
        let periodValue = [];
        if (Array.isArray(parsedDataJson.formData)) {
          for (const item of parsedDataJson.formData) {
            if (item.label === '期間') {
              periodValue.push(item.value);
            }
          }
        } else {
          console.log('formData không phải là mảng');
        }
        parsedDataJson.periodValues = periodValue;
        setAccordionItems(parsedDataJson);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    Load();
  }, [id]);
  let isPeriodDisplayed = false;

  return (
    <>
      <div className="box-register">
        <ul>
          {accordionItems &&
            accordionItems.formData &&
            accordionItems.formData.map((formDataItem: any, index: any) => {
              if (formDataItem.label === '期間' && isPeriodDisplayed) {
                return null;
              }

              if (formDataItem.label === '期間') {
                isPeriodDisplayed = true;
              }

              if (!formDataItem.label) {
                return null;
              }

              let valueToDisplay = formDataItem.value;

              // Kiểm tra nếu label là "日間"
              if (formDataItem.label === '日間') {
                let duration = formDataItem.value.pop(); // Lấy giá trị "日間" ra khỏi mảng
                valueToDisplay = formDataItem.value.join(' ~ '); // Nối giá trị còn lại
                valueToDisplay += `  ${duration.value} ${duration.label}`; // Thêm "日間" vào cuối
              } else if (Array.isArray(formDataItem.value)) {
                valueToDisplay = formDataItem.value.join('  '); // Nối giá trị với dấu cách
              }

              return (
                <li key={index}>
                  <div className="box-register__item">
                    <span className="box-register__item__title">
                      {formDataItem.label}
                    </span>
                    <span className="box-register__item__content">
                      {valueToDisplay}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};
