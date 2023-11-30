import { Heading2 } from "../../components/Heading";
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";

export const Dayoff = () => {
  return (
    <>
      <Heading2 text="Danh sách xin nghỉ phép" />
      <CTable heads={["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", "Ghi Chú", "Hủy đăng ký nghỉ"]} contents={["h4", "h5", "h6", "h4", "h5", "h6"]}/>
      <Pagination />
    </>
  );
};
