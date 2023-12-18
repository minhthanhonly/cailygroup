<?php
require('../database/DBConnect.php');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        // lấy dữ liệu
        $allGroup = mysqli_query($db_conn, "SELECT id, group_name FROM dayoffs");
        
        if ($allGroup) {
            $data = [];
            
            while ($row = mysqli_fetch_assoc($allGroup)) {
                $data[] = $row;
            }
            
            if (!empty($data)) {
                http_response_code(200);
                echo json_encode($data);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "No data found"]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internal Server Error"]);
        }
        break;

    case "POST":
        // Thêm dữ liệu
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['group_name'])) {
            $groupName = mysqli_real_escape_string($db_conn, $data['group_name']);

            $insertQuery = "INSERT INTO dayoffs (group_name) VALUES ('$groupName')";

            if (mysqli_query($db_conn, $insertQuery)) {
                http_response_code(201);
                echo json_encode(["message" => "Data inserted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Failed to insert data"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Invalid data"]);
        }
        break;

    case "PUT":
        // Sửa dữ liệu
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['id']) && isset($data['group_name'])) {
            $id = mysqli_real_escape_string($db_conn, $data['id']);
            $groupName = mysqli_real_escape_string($db_conn, $data['group_name']);

            $updateQuery = "UPDATE dayoffs SET group_name = '$groupName' WHERE id = $id";

            if (mysqli_query($db_conn, $updateQuery)) {
                http_response_code(200);
                echo json_encode(["message" => "Data updated successfully"]);
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
        // Xóa dữ liệu
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['id'])) {
            $id = mysqli_real_escape_string($db_conn, $data['id']);

            $deleteQuery = "DELETE FROM dayoffs WHERE id = $id";

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
