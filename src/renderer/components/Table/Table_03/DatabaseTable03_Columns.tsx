



let DatabaseTable03_Columns = () => {
    
  let ColumCountssss = 8;
       // Khai Báo Props với ColumCounts
      const Column_Count = ColumCountssss;

      
    const columns = Array.from({ length: Column_Count }, (_, colIndex) => colIndex + 1);
    const DatabaseTest = ['Họ Và Tên','Nhóm', 'Số Ngày', 'Ngày Bắt Đầu', 'Ngày Kết Thúc', 'Ghi Chú', 'chấp nhận', 'từ chối'];
    // const addclass = ['', '', 'Content 3', 'Content 4', 'Content 5', 'Content 6', 'Content 7', 'Content 8', 'Content 9']; className={addclass[index]}
    const colSpan_colums = [,];
    
    return(
          <>
          <tr>
            {columns.map((item, index) => (
                <th colSpan={colSpan_colums[index]}  >
                    {DatabaseTest[index]}
                </th>
            ))}
            </tr>
          </>

    )
    

}



export default DatabaseTable03_Columns ;



