<?php
require('../database/DBConnect.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS,DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);



switch ($method) {
    case "GET":
        $query = "SELECT users.*, authority.authority_name , groups.group_name 
          FROM users 
          INNER JOIN groups ON users.user_group = groups.id 
          INNER JOIN authority ON users.authority = authority.id";


        $allGroup = mysqli_query($db_conn, $query);

        if ($allGroup) {
            $data = mysqli_fetch_all($allGroup);
            http_response_code(200);
            echo json_encode(["message" => "Cập nhật dữ liệu thành công cho giờ vào", "data" => $data]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Không thể cập nhật dữ liệu cho giờ vào: " . mysqli_error($db_conn)]);
        }
        break;

    case "POST":
        // Xử lý khi có yêu cầu POST
        break;
    case "PUT":
        break;
}
?>