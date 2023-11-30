import { Heading2 } from "../../components/Heading";
import { Pagination } from "../../components/Pagination";
import { CTableBody } from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";

export const Dayoff = () => {
  const info = ["h4", "h5", "h6"]
  return (
    <>
      <Heading2 text="Danh sách xin nghỉ phép" />
      <div className='table-container'>
        <table className="table table__custom">
          <CTableHead heads={["h1", "h2", "h3"]} />
          <CTableBody/>
        </table>
      </div>
      <Pagination />
    </>
  );
};
