


 interface CountColumsTable_Proprs {

    ColumCounts: number;

}




let DatabaseTable_Columns = (props : CountColumsTable_Proprs) => {

       // Khai Báo Props với ColumCounts
      const Column_Count = props.ColumCounts;

      
    const columns = Array.from({ length: Column_Count }, (_, colIndex) => colIndex + 1);
    const DatabaseTest = ['Ngày Tháng', 'Thứ', 'Bắt Đầu', 'Kết Thúc', 'giờ làm việc', 'ngoài giờ', 'giờ nghỉ trưa', 'ghi chú', 'hành động'];
    const addclass = ['', '', 'Content 3', 'Content 4', 'Content 5', 'Content 6', 'Content 7', 'Content 8', 'Content 9'];
    const colSpan_colums = [, , , , , , , , ];
    
    return(
          <>
            {columns.map((item, index) => (
                <th colSpan={colSpan_colums[index]}  className={addclass[index]}>
                    {DatabaseTest[index]}
                </th>
            ))}
          </>

    )
    

}


export default DatabaseTable_Columns;



