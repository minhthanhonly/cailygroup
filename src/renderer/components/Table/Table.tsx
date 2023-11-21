
import './Table.scss';

interface PersonProps {
//   ArrayTablehai: [ {index: number; Textcolum: string; }];
    rowCount : number;
    columnCount: number;

}

//props đang truyền tham số là string.  > props: PersonProps
const TablePage = (props: PersonProps) =>  {
    //
//    const receivedDataArray = props.ArrayTablehai;

   const rowCount = props.rowCount;
   const columnCount = props.columnCount;

    // Tạo một mảng với số lượng cột được định nghĩa
    // const columnHeaders = Array.from({ length: parseInt(columns, receivedData) }, (_, index) => `Column ${index + 1}`);
     const rows = Array.from({ length: rowCount }, (_, rowIndex) => rowIndex + 1);
    const columns = Array.from({ length: columnCount }, (_, colIndex) => colIndex + 1);


    
  return (
    <div>
      <h2>Table Page</h2>
      <table >
        <thead>
            <tr>
                {columns.map((item,index) =>{
                    return(
                        <th key={index}>{item}</th>
                    )
                })}
            </tr>
        </thead>
        <tbody>
             {rows.map((item,index) =>{
                    return(
                         <tr key={index}>
                                {columns.map(colIndex => (
                                    <td key={colIndex}>Row{item}</td>
                                ))}
                        </tr>
                    )
                })}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;