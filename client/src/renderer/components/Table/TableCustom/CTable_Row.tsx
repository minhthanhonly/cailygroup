import React, { useEffect , useState } from 'react';

interface tableRows{
    Rows_count : number;
}

let CTable_Row = (Props : tableRows) => {

	
    let Count_Rows = Props.Rows_count;
     const rows = Array.from({ length: Count_Rows }, (_, colIndex) => colIndex + 1);


    return(
        <>
		<tr>
			  {rows.map((item, index) => (
                <><td key={index}>Huỳnh Thị Thanh Tuyền</td></>
            ))}
		</tr>
        </>
    )
} 

export default CTable_Row;



