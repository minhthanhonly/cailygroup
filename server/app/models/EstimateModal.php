<?php

class EstimateModal {
    function getlist() {
        global $conn;

        // Thực hiện truy vấn SELECT
        $sql = "SELECT * FROM table_register";
        $result = $conn->query($sql);

        // Khởi tạo mảng để lưu trữ dữ liệu
        $data = array();

        // Kiểm tra và hiển thị kết quả
        if ($result->num_rows > 0) {
            // Duyệt qua từng dòng dữ liệu và thêm vào mảng
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        // Đóng kết nối
        $conn->close();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($data);
        return;
    }
}
?>