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
        break;

        case "POST":
            echo $data['dataTimeCardDetails']['id_groupwaretimecard'];
           
          if (isset($data['dataTimeCardDetails']['id_groupwaretimecard'])) {
        $insertQuery = "INSERT INTO `timecard_details`(`id_groupwaretimecard`, `timecard_open`, `timecard_close`, `timecard_originalopen`, `timecard_originalclose`, `timecard_interval`, `timecard_originalinterval`, `timecard_time`, `timecard_timeover`, `timecard_timeinterval`, `timecard_comment`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";

        $stmt = mysqli_prepare($db_conn, $insertQuery);
          
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($db_conn)]);
            exit();
        }

        mysqli_stmt_bind_param($stmt, "isssssssssss", 
            $data['dataTimeCardDetails']['id_groupwaretimecard'],
            $data['dataTimeCardDetails']['timecard_open'],
            $data['dataTimeCardDetails']['timecard_close'],
            $data['dataTimeCardDetails']['timecard_originalopen'],
            $data['dataTimeCardDetails']['timecard_originalclose'],
            $data['dataTimeCardDetails']['timecard_interval'],
            $data['dataTimeCardDetails']['timecard_originalinterval'],
            $data['dataTimeCardDetails']['timecard_time'],
            $data['dataTimeCardDetails']['timecard_timeover'],
            $data['dataTimeCardDetails']['timecard_timeinterval'],
            $data['dataTimeCardDetails']['timecard_comment'],
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