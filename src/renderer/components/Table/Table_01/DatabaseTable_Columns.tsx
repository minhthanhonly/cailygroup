



let DatabaseTable_Columns = () => {
    
  let ColumCountssss = 9;
       // Khai Báo Props với ColumCounts
      const Column_Count = ColumCountssss;

      
    const columns = Array.from({ length: Column_Count }, (_, colIndex) => colIndex + 1);
    const DatabaseTest = ['Ngày Tháng', 'Thứ', 'Bắt Đầu', 'Kết Thúc', 'giờ làm việc', 'ngoài giờ', 'giờ nghỉ trưa', 'ghi chú', 'hành động'];
    // const addclass = ['', '', 'Content 3', 'Content 4', 'Content 5', 'Content 6', 'Content 7', 'Content 8', 'Content 9']; className={addclass[index]}
    const colSpan_colums = [,];
    
    return(
          <>
          <tr>
            {columns.map((item, index) => (
                <th key={index} colSpan={colSpan_colums[index]}  >
                    {DatabaseTest[index]}
                </th>
            ))}
            </tr>
          </>

    )
    

}



export default DatabaseTable_Columns ;



