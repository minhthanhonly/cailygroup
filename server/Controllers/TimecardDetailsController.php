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
            if (isset($data['method'])) {
                switch ($data['method']) {
                    case "UPDATE_TIMECARD":
                        $timecardId = isset($data["dataTime"]["id"]) ? $data["dataTime"]["id"] : null;
                        $timecard_open = isset($data["dataTime"]["timecard_open"]) ? $data["dataTime"]["timecard_open"] : null;
                        $timecard_now = isset($data["dataTime"]["timecard_now"]) ? $data["dataTime"]["timecard_now"] : null;
                        if ($timecardId !== null) {
                            // Cập nhật trạng thái trong cơ sở dữ liệu
                            $sql = "UPDATE timecard_details SET timecard_close = ?, timecard_originalclose = ? WHERE id_groupwaretimecard = ?";
                            $stmt = $db_conn->prepare($sql);
                            $stmt->bind_param("ssi", $timecard_now, $timecard_now, $timecardId);
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
                        exit;
                    break;
                }
            }
            if (isset($data['dataTimeCardDetails']['id_groupwaretimecard'])) {
                $insertQuery = "INSERT INTO `timecard_details`(`id_groupwaretimecard`, `timecard_open`, `timecard_originalopen`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, NOW(), NOW())";

                $stmt = mysqli_prepare($db_conn, $insertQuery);
                
                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($db_conn)]);
                    exit();
                }

                mysqli_stmt_bind_param($stmt, "iss", 
                    $data['dataTimeCardDetails']['id_groupwaretimecard'],
                    $data['dataTimeCardDetails']['timecard_open'],
                    $data['dataTimeCardDetails']['timecard_open'],
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