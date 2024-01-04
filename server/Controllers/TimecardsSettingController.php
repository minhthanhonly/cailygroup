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
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (isset($data['holiday_data']['name']) && isset($data['holiday_data']['days'])) {
            $insertQuery = "INSERT INTO holidays (name, days) VALUES (?, ?)";

            $stmt = mysqli_prepare($db_conn, $insertQuery);

            if (!$stmt) {
                http_response_code(500);
                echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($db_conn)]);
                exit();
            }

            // Gán giá trị cho các tham số
            mysqli_stmt_bind_param($stmt, "isssssiss", 
                $data['holiday_data']['name'],
                $data['holiday_data']['days']
            );

            if (mysqli_stmt_execute($stmt)) {
                http_response_code(201);
                echo json_encode(["message" => "Thêm thành công"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Thêm không thành công"]);
            }

            mysqli_stmt_close($stmt);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Dữ liệu không hợp lệ. 'name' bị thiếu"]);
        }
    break;

    case "DELETE":
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['id'])) {
            $id = mysqli_real_escape_string($db_conn, $data['id']);
            $deleteQuery = "DELETE FROM holidays WHERE id = $id";

            if (mysqli_query($db_conn, $deleteQuery)) {
                http_response_code(200);
                echo json_encode(["message" => "Data deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Failed to delete data"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Invalid data"]);
        }
        break;

    default:
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    break;
}
?>