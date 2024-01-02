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
        $allGroup = mysqli_query($db_conn, "SELECT * FROM holidays");
            if(mysqli_num_rows($allGroup) > 0) {
                while($row = mysqli_fetch_array($allGroup)) {
                    $json_array["holidaydata"][] = array("id" => $row['id'], "name" => $row['name'], "days" => $row['days']);
                }
                echo json_encode($json_array["holidaydata"]);
                return;
            } else {
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }
        break;
    
        case "POST":
            // FUNCTION POST
        break;
    }
?>