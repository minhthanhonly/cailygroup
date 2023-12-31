<?php
require('../database/DBConnect.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS,DELETE,PUT");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case "GET":
            $allGroup = mysqli_query($db_conn, "SELECT * FROM groups");
            if(mysqli_num_rows($allGroup) > 0) {
                while($row = mysqli_fetch_array($allGroup)) {
                    $json_array["groupdata"][] = array("id" => $row['id'], "group_name" => $row['group_name']);
                }
                echo json_encode($json_array["groupdata"]);
                return;
            } else {
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['group_data']['group_name'])) {
            $insertQuery = "INSERT INTO groups (group_name, add_level, owner, createdAt) 
                            VALUES (?, ?, ?, NOW())";

            $stmt = mysqli_prepare($db_conn, $insertQuery);

            if (!$stmt) {
                http_response_code(500);
                echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($db_conn)]);
                exit();
            }

            mysqli_stmt_bind_param($stmt, "sis", 
                $data['group_data']['group_name'],
                $data['group_data']['add_level'],
                $data['group_data']['owner']
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
    

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['id'], $data['group_name'])) {
            $id = mysqli_real_escape_string($db_conn, $data['id']);
            $group_name = mysqli_real_escape_string($db_conn, $data['group_name']);
    
            $updateQuery = "UPDATE groups SET group_name = '$group_name' WHERE id = '$id'"; 
    
            if (mysqli_query($db_conn, $updateQuery)) {
                http_response_code(200);
                echo json_encode(["message" => "Data update successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Failed to update data"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Invalid data"]);
        }
        break;
        
    case "DELETE":
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['id'])) {
            $id = mysqli_real_escape_string($db_conn, $data['id']);
            $deleteQuery = "DELETE FROM groups WHERE id = $id";

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