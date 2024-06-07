import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

export const Register = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);

  const Load = async () => {
    try {
      const response = await axiosPrivate.get('application/getforid/' + id);
      const data = response.data;
      // Phân tích JSON
      const parsedDataJson = JSON.parse(data.datajson);

      // Lọc bỏ phần tử có id là 'info-file'
      if (parsedDataJson.formData) {
        parsedDataJson.formData = parsedDataJson.formData.filter(
          (item) => item.id !== 'info-file',
        );
      }

      // kiểm tra và lấy dữ liệu file nếu có
      if (parsedDataJson.formData) {
        parsedDataJson.formData = parsedDataJson.formData.map((item) => {
          if (item.type && item.type.includes('file') && item.value) {
            const [localFile, url] = item.value;
            const fileName = url ? url.split('/').pop() : null;
            item.fileInfo = { localFile, url, fileName };
          }
          return item;
        });
      }

      const hasFormData =
        parsedDataJson.formData && parsedDataJson.formData.length > 0;
      const hasTableData =
        parsedDataJson.tableData && parsedDataJson.tableData.length > 0;
      if (hasFormData && hasTableData) {
        // Trường hợp: formData không rỗng và tableData không rỗng
        let periodValue = [];
        for (const item of parsedDataJson.formData) {
          if (item.label === '期間') {
            periodValue.push(item.value);
          }
        }
        parsedDataJson.periodValues = periodValue;
        setAccordionItems(parsedDataJson);
      } else if (hasFormData) {
        // Trường hợp : formData không rỗng
        let periodValue = [];
        for (const item of parsedDataJson.formData) {
          if (item.label === '期間') {
            periodValue.push(item.value);
          }
        }
        parsedDataJson.periodValues = periodValue;
        setAccordionItems(parsedDataJson);
      } else if (hasTableData) {
        //trường hợp : tableData không rỗng
        setAccordionItems(parsedDataJson);
      } else {
        //console.log('Cả formData và tableData đều rỗng');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    Load();
  }, [id]);

  let isPeriodDisplayed = false;

  return (
    <>
      {accordionItems &&
        (accordionItems.formData &&
        accordionItems.formData.length > 0 &&
        accordionItems.tableData &&
        accordionItems.tableData.length > 0 ? (
          <div>
            <div className="box-register">
              <ul>
                {accordionItems.formData.map(
                  (formDataItem: any, index: any) => {
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
                      // valueToDisplay += `  ${duration.value}   ${duration.label}  `; // Thêm "日間" vào cuối
                    } else if (
                      Array.isArray(formDataItem.value) &&
                      formDataItem.value.length >= 2 // Kiểm tra nếu có ít nhất 2 phần tử
                    ) {
                      // Kiểm tra nếu cả hai phần tử đều là ngày
                      if (
                        !isNaN(Date.parse(formDataItem.value[0])) &&
                        !isNaN(Date.parse(formDataItem.value[1]))
                      ) {
                        valueToDisplay = formDataItem.value.join(' ~ '); // Nếu cả hai đều là ngày, nối chúng với dấu "~"
                      } else {
                        let [date, ...times] = formDataItem.value; // Tách ngày và thời gian
                        let timeRange = times.join(' ~ '); // Nối các phần tử thời gian
                        valueToDisplay = `${date} ${timeRange}`; // Hiển thị ngày và khoảng thời gian
                      }
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
                            {formDataItem.type &&
                            formDataItem.type.includes('file')
                              ? formDataItem.fileInfo && (
                                  <>
                                    <div>
                                      <a
                                        href={formDataItem.fileInfo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {formDataItem.fileInfo.fileName}
                                      </a>
                                    </div>
                                  </>
                                )
                              : valueToDisplay}
                          </span>
                        </div>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
            <div className="box-register">
              <div className="table tbl_custom table tbl_custom--register">
                <div className="tbl_custom--03">
                  <table>
                    <thead>
                      <tr>
                        {accordionItems &&
                          accordionItems.tableData &&
                          Object.keys(accordionItems.tableData[0]).map(
                            (key, index) => {
                              // Bỏ qua cột 'id'
                              if (key !== 'id') {
                                return <th key={index}>{key}</th>;
                              }
                              return null;
                            },
                          )}
                      </tr>
                    </thead>
                    <tbody>
                      {accordionItems &&
                        accordionItems.tableData &&
                        accordionItems.tableData.map(
                          (tableDataItem: any, index: any) => (
                            <tr key={index}>
                              {Object.entries(tableDataItem).map(
                                ([key, value], index) => {
                                  if (key !== 'id') {
                                    if (key === 'date') {
                                      // Kiểm tra xem giá trị ngày có hợp lệ không trước khi chuyển đổi
                                      if (!isNaN(Date.parse(value))) {
                                        value = new Date(value)
                                          .toISOString()
                                          .split('T')[0];
                                      } else {
                                        // Xử lý nếu giá trị rỗng hoặc không hợp lệ
                                        value = '';
                                      }
                                    }
                                    return <td key={index}>{value}</td>;
                                  }
                                  return null;
                                },
                              )}
                            </tr>
                          ),
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : accordionItems.formData && accordionItems.formData.length > 0 ? (
          //trường hợp : formData không rỗng
          <div className="box-register">
            <ul>
              {accordionItems.formData.map((formDataItem: any, index: any) => {
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
                  // valueToDisplay += `  ${duration.value}   ${duration.label}  `; // Thêm "日間" vào cuối
                } else if (
                  Array.isArray(formDataItem.value) &&
                  formDataItem.value.length >= 2 // Kiểm tra nếu có ít nhất 2 phần tử
                ) {
                  // Kiểm tra nếu cả hai phần tử đều là ngày
                  if (
                    !isNaN(Date.parse(formDataItem.value[0])) &&
                    !isNaN(Date.parse(formDataItem.value[1]))
                  ) {
                    valueToDisplay = formDataItem.value.join(' ~ '); // Nếu cả hai đều là ngày, nối chúng với dấu "~"
                  } else {
                    let [date, ...times] = formDataItem.value; // Tách ngày và thời gian
                    let timeRange = times.join(' ~ '); // Nối các phần tử thời gian
                    valueToDisplay = `${date} ${timeRange}`; // Hiển thị ngày và khoảng thời gian
                  }
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
                        {formDataItem.type && formDataItem.type.includes('file')
                          ? formDataItem.fileInfo && (
                              <>
                                <div>
                                  <a
                                    href={formDataItem.fileInfo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {formDataItem.fileInfo.fileName}
                                  </a>
                                </div>
                              </>
                            )
                          : valueToDisplay}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          //trường hợp tableData không rỗng
          <div className="box-register">
            <div className="table tbl_custom table tbl_custom--register">
              <div className="tbl_custom--03">
                <table>
                  <thead>
                    <tr>
                      {accordionItems &&
                        accordionItems.tableData &&
                        Object.keys(accordionItems.tableData[0]).map(
                          (key, index) => {
                            if (key !== 'id') {
                              return <th key={index}>{key}</th>;
                            }
                            return null;
                          },
                        )}
                    </tr>
                  </thead>
                  <tbody>
                    {accordionItems &&
                      accordionItems.tableData &&
                      accordionItems.tableData.map(
                        (tableDataItem: any, index: any) => (
                          <tr key={index}>
                            {Object.entries(tableDataItem).map(
                              ([key, value], index) => {
                                if (key !== 'id') {
                                  if (key === 'date') {
                                    if (!isNaN(Date.parse(value))) {
                                      value = new Date(value)
                                        .toISOString()
                                        .split('T')[0];
                                    } else {
                                      // Xử lý nếu giá trị rỗng hoặc không hợp lệ
                                      value = '';
                                    }
                                  }
                                  return <td key={index}>{value}</td>;
                                }
                                return null;
                              },
                            )}
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
