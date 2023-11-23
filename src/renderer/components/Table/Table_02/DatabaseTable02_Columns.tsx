



let DatabaseTable02_Columns = () => {
    
  let ColumCountssss = 6;
       // Khai Báo Props với ColumCounts
      const Column_Count = ColumCountssss;

      
    const columns = Array.from({ length: Column_Count }, (_, colIndex) => colIndex + 1);
    const DatabaseTest = ['Họ Và Tên', 'Số Ngày', 'Ngày Bắt Đầu', 'Ngày Kết Thúc', 'Ghi Chú', 'Hủy đăng ký nghỉ '];
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



export default DatabaseTable02_Columns ;



