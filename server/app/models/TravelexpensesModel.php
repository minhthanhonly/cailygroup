<?php

class TravelexpensesModel {
    function postadd($id, $tablejson, $owner, $table_id, $status) {
        global $conn;
        if (!$conn) {
            die("Kết nối không thành công: " . mysqli_connect_error());
        }
       
        // Kiểm tra phương thức yêu cầu
            // Đọc dữ liệu JSON từ yêu cầu POST
            $json_data = file_get_contents("php://input");
            $tablejson = $json_data;

            $decode = json_decode($json_data);
             $owner = $decode->owner;
             $table_id =  $decode->table_id;
             $statusOne = $decode->id_status;
            
            $insertQuery = "INSERT INTO table_json (tablejson, owner, table_id, id_status, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW() , NOW())";
            $stmt = mysqli_prepare($conn, $insertQuery);
 
            // Kiểm tra và xử lý lỗi nếu có
            if (!$stmt) {
                http_response_code(500);
                echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                exit();
            }

            // Bind các tham số vào câu lệnh SQL
            mysqli_stmt_bind_param($stmt, "ssss", $tablejson, $owner, $table_id, $statusOne);

            // Thực thi câu lệnh SQL và kiểm tra kết quả
            if (mysqli_stmt_execute($stmt)) {
                http_response_code(201);
                echo json_encode(["message" => "Thêm thành công"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Thêm không thành công: " . mysqli_error($conn)]);
            }

            // Đóng câu lệnh SQL
            mysqli_stmt_close($stmt);
    }
}
?> 