<?php
   require('../database/DBConnect.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

    switch($method) {
        case "GET":
            // FUNCTION GET
        break;

        case "POST":
            
          if (isset($data['dataTimeCard']['timecard_year'])) {
        $insertQuery = "INSERT INTO timecards (timecard_year, user_id, timecard_month, timecard_day, timecard_date, owner, timecard_temp, createdAt, updatedAt	) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";

        $stmt = mysqli_prepare($db_conn, $insertQuery);

        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($db_conn)]);
            exit();
        }

        mysqli_stmt_bind_param($stmt, "iiiisss", 
            $data['dataTimeCard']['timecard_year'],
            $data['dataTimeCard']['user_id'],
            $data['dataTimeCard']['timecard_month'],
            $data['dataTimeCard']['timecard_day'],
            $data['dataTimeCard']['timecard_date'],
            $data['dataTimeCard']['owner'],
            // $data['dataTimeCard']['editor'],
            $data['dataTimeCard']['timecard_temp'],
            // $data['group_data']['createdAt'],
        );

       if (mysqli_stmt_execute($stmt)) {
                http_response_code(201);
                echo json_encode(["message" => "Thêm thành công"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Thêm không thành công: " . mysqli_error($db_conn)]);
            }

        mysqli_stmt_close($stmt);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Dữ liệu không hợp lệ. 'group_name' bị thiếu"]);
    }

        break;
    }
?>