import CardTime from "../../components/Card/Card";
import { AddGroup } from "../../components/Form/Form";
import { Heading3 } from "../../components/Heading";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import NavTimcard from "../../layouts/components/Nav/NavTimcard";
import { Pagination } from "../../components/Pagination"
import { MouseEvent, useState } from "react";
import axios from "axios";
import { urlControl } from "../../routes/server";

export const TimecardSetting = () => {
  const [parentHours, setParentHours] = useState<number>(0);
  const [parentMinutes, setParentMinutes] = useState<number>(0);

  // State để lưu trữ giờ và phút từ CardTime
  const [cardTimeHours, setCardTimeHours] = useState<number>(0);
  const [cardTimeMinutes, setCardTimeMinutes] = useState<number>(0);

  const Data = [
    ["Ngày 01 Tháng 01", "2", "Tết Dương Lịch"],
    ["Ngày 30 Tháng 04", "4", "Ngày giải phóng miền Nam, Thống nhất Đất nước"],
  ]


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục muốn hiển thị trên mỗi trang
  // Tính tổng số trang
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };


  // hàm onchange
  const handleCardTimeChange = (hours: number, minutes: number) => {
    // Cập nhật state từ CardTime
    setCardTimeHours(hours);
    setCardTimeMinutes(minutes);
  };

  const handleUpdateTimeInput = async () => {
    try {
      const dataUpdateArray = [
        { id: 1, hours: cardTimeHours },
        { id: 2, minutes: cardTimeMinutes }
      ];
      const promises = dataUpdateArray.map(async (dataUpdate) => {
        const response = await axios.put(
          urlControl + 'ConfigsController.php',
          { ...dataUpdate, method: 'UPDATE_LOGIN' },
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Update Response:', response.data);
      });

      // Chờ tất cả các yêu cầu axios hoàn thành
      await Promise.all(promises);
      console.log('Update Response:', promises);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };

  const handleUpdateOutTime = async () => {
    try {
      const dataUpdateArray = [
        { id: 3, hours: cardTimeHours },
        { id: 4, minutes: cardTimeMinutes }
      ];
      const promises = dataUpdateArray.map(async (dataUpdate) => {

        const response = await axios.put(
          urlControl + 'ConfigsController.php',
          { ...dataUpdate, method: 'UPDATE_OUTTIME' },
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Update Response:', response.data);
      });

      // Chờ tất cả các yêu cầu axios hoàn thành
      await Promise.all(promises);
      console.log('Update Response:', promises);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };


  return (
    <>
      <NavTimcard role="admin" />
      <Heading3 text="Cấu hình giờ vào - giờ ra" />
      <div className="card-box">
        <div className="card-box--center">
          <h4>Giờ vào</h4>
          <CardTime onChange={handleCardTimeChange} />
          <button className="btn btn--widthAuto" onClick={handleUpdateTimeInput}>Cập nhật</button>
        </div>
        <div className="card-box--center">
          <h4>Giờ ra</h4>
          <CardTime onChange={handleCardTimeChange} />
          <button className="btn btn--widthAuto" onClick={handleUpdateOutTime} >Cập nhật</button>
        </div>
      </div>
      <Heading3 text="Cấu hình ngày lễ" />
      <AddGroup />
      <CTable>
        <CTableHead heads={["Ngày Tháng", "Thứ", "Ngày lễ - Ngày nghỉ", "Hành Động"]} />
        <CTableBody path_edit={"edit"} data={Data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} permission_delete={true} />
      </CTable>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};
