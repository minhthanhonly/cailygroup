<?php
require('../database/DBConnect.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


$method = isset($_GET['method']) ? $_GET['method'] : '';

switch ($method) {
    case "GET":
        $query = "SELECT dayoffs.*, 
                     CONCAT(dayoffs.time_start, ' - ' , dayoffs.date_start) AS start_datetime, 
                     CONCAT(dayoffs.time_end, ' - ', dayoffs.date_end) AS end_datetime, 
                     users.realname 
              FROM dayoffs
              JOIN users ON dayoffs.user_id = users.id";
        $allGroup = mysqli_query($db_conn, $query);

        if ($allGroup) {
            $data = [];

            while ($row = mysqli_fetch_assoc($allGroup)) {
                // Thêm dữ liệu mới vào mảng
                $row['start_datetime'] = $row['start_datetime'];
                $row['end_datetime'] = $row['end_datetime'];
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
    
    case "GET_STATUS_ZERO":
        $groupFilter = isset($_GET['group']) ? mysqli_real_escape_string($db_conn, $_GET['group']) : 'all';

        $query = "SELECT dayoffs.*, 
                 CONCAT(dayoffs.time_start, ' - ' , dayoffs.date_start) AS start_datetime, 
                 CONCAT(dayoffs.time_end, ' - ', dayoffs.date_end) AS end_datetime, 
                 users.realname 
          FROM dayoffs
          JOIN users ON dayoffs.user_id = users.id
          JOIN groups ON users.user_group = groups.id
          WHERE dayoffs.status = 0";

        if ($groupFilter !== 'all') {
            $query .= " AND groups.id = '$groupFilter'";
        }
        $result = mysqli_query($db_conn, $query);

        if ($result) {
            $data = [];

            while ($row = mysqli_fetch_assoc($result)) {
                $row['start_datetime'] = $row['start_datetime'];
                $row['end_datetime'] = $row['end_datetime'];
                $data[] = $row;
            }

            if (!empty($data)) {
                http_response_code(200);
                echo json_encode($data);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "No data found with status = 0"]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internal Server Error"]);
        }
    break;

    case "GET_GROUPS":
        $query = "SELECT * FROM groups";
        $result = mysqli_query($db_conn, $query);

        if ($result) {
            $data = [];

            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }

            if (!empty($data)) {
                http_response_code(200);
                echo json_encode($data);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "No groups found"]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Internal Server Error"]);
        }
    break;


    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($data['group_data']['user_id']);

        if (isset($data['group_data']['user_id'])) {
            $insertQuery = "INSERT INTO dayoffs (user_id, date_start, date_end, time_start, time_end, note, day_number, status, owner, createdAt) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

            $stmt = mysqli_prepare($db_conn, $insertQuery);

            mysqli_stmt_bind_param($stmt, "isssssiss", 
                $data['group_data']['user_id'],
                $data['group_data']['date_start'],
                $data['group_data']['date_end'],
                $data['group_data']['time_start'],
                $data['group_data']['time_end'],
                $data['group_data']['note'],
                $data['group_data']['day_number'],
                $data['group_data']['status'],
                $data['group_data']['owner'],
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
            echo json_encode(["error" => "Dữ liệu không hợp lệ. 'user_id' bị thiếu"]);
        }
    break;

    case "UPDATE_STATUS":
        $dayoffId = isset($_POST["id"]) ? $_POST["id"] : null;
        $status = isset($_POST["status"]) ? $_POST["status"] : null;

        if ($dayoffId !== null && $status !== null) {
            // Cập nhật trạng thái trong cơ sở dữ liệu
            $sql = "UPDATE dayoffs SET status = ? WHERE id = ?";
            $stmt = $db_conn->prepare($sql);
            $stmt->bind_param("ii", $status, $dayoffId);

            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["success" => true]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "error" => $stmt->error]);
            }

            $stmt->close();
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Invalid parameters"]);
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
