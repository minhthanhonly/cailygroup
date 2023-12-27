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

switch($method) {
    case "GET":
        $query = "SELECT * FROM users";
        $allGroup = mysqli_query($db_conn, $query);

        if ($allGroup) {
            http_response_code(200);
            echo json_encode($data);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internal Server Error"]);
        }
    break;
    
        case "POST":
            // FUNCTION POST
        break;
    }
?>