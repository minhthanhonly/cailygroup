import { CTableBody } from "./CTableBody"
import { CTableHead } from "./CTableHead"

type CTableProps = {
  heads: string[];
  contents: string[];
}

export const CTable = (props: CTableProps) => {
  return (
    <div className='table-container'>
      <table className="table table__custom">
        <CTableHead heads={props.heads}/>
        <CTableBody contents={props.contents}/>
      </table>
    </div>
  )
}
