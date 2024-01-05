<?php
require('../database/DBConnect.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS,DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);
switch ($method) {
       case "GET":
        $query = "SELECT realname, user_group, authority FROM users";
        $allGroup = mysqli_query($db_conn, $query);

        var_dump($allGroup);
        if ($allGroup) {
            $data = mysqli_fetch_all($allGroup, MYSQLI_ASSOC);
            
            http_response_code(200);
            echo json_encode($data);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internal Server Error"]);
        }
        break;

    case "POST":
        // Xử lý khi có yêu cầu POST
        break;
    case "PUT":
        break;
}
?>