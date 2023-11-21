
import './Table.scss';

interface PersonProps {
  ArrayTablehai: [ {index: number; Textcolum: string; }];
}

//props đang truyền tham số là string.  > props: PersonProps
const TablePage = (props: PersonProps) =>  {
    //
   const receivedDataArray = props.ArrayTablehai;

    // Tạo một mảng với số lượng cột được định nghĩa
    // const columnHeaders = Array.from({ length: parseInt(columns, receivedData) }, (_, index) => `Column ${index + 1}`);


    
  return (
    <div>
      <h2>Table Page</h2>
      <table >
        <thead>
            <tr>
                {receivedDataArray.map((item,index) =>{
                    return(
                        <th key={index}>{item.Textcolum}</th>
                    )
                })}
                {/* {columnHeaders.map((columnHeaders, index) => (
                <th key={index}>{columnHeaders}</th>
            ))} */}
            </tr>
         
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>john@example.com</td>
             <td>1</td>
            <td>John Doe</td>
            <td>john@example.com</td>
          </tr>
          {/* Thêm dữ liệu của bạn vào đây */}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;