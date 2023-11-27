interface Col{
    Col_count : number;
    // [Col_title: string]: any;
    // Col_title: { col_1: string; col_2: string;col_3: string;col_4: string; col_5: string; };
     Col_title: { [key: string]: any; };
}


const CTable_Col = (Props: Col ) => {
       // Khai Báo Props với ColumCounts
      const Column_Count = Props.Col_count;
    let DatabaseTest = Props.Col_title;
      
    const columns = Array.from({ length: Column_Count }, (_, colIndex) => colIndex + 1);
    
    // const addclass = ['', '', 'Content 3', 'Content 4', 'Content 5', 'Content 6', 'Content 7', 'Content 8', 'Content 9']; className={addclass[index]}
    const colSpan_colums = [,];
    
    return(
          <>
          <tr>
            {Object.entries(DatabaseTest).map(([key, value]) => (
                 <th key={key}>
                {value}
               </th>
            ))}
            </tr>
          </>

    )
}

export default CTable_Col;