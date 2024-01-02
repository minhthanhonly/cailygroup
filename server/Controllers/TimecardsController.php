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
            $allTimecards = mysqli_query($db_conn, "SELECT * FROM timecards");
            if (mysqli_num_rows($allTimecards) > 0) {
                $json_array["timecarddata"] = array();

                while ($row = mysqli_fetch_array($allTimecards)) {
                    // Lấy id và timecard_date từ bảng timecards
                    $timecardId = $row['id'];
                    $timecardDate = $row['timecard_date'];

                    // Truy vấn tất cả các trường từ bảng timecard_details
                    $timecardDetailsQuery = "SELECT td.* 
                                            FROM timecard_details td
                                            WHERE td.id_groupwaretimecard = ?";
                    $stmtDetails = mysqli_prepare($db_conn, $timecardDetailsQuery);

                    if ($stmtDetails) {
                        mysqli_stmt_bind_param($stmtDetails, "i", $timecardId);
                        mysqli_stmt_execute($stmtDetails);
                        $result = mysqli_stmt_get_result($stmtDetails);

                        // Lưu kết quả vào mảng
                        while ($rowDetails = mysqli_fetch_assoc($result)) {
                            $rowDetails["timecard_date"] = $timecardDate; // Thêm trường timecard_date từ bảng timecards
                            $json_array["timecarddata"][] = $rowDetails;
                        }
                    }
                }

                // Kiểm tra nếu có dữ liệu trong mảng
                if (!empty($json_array["timecarddata"])) {
                    echo json_encode($json_array["timecarddata"]);
                    return;
                } else {
                    echo json_encode(["result" => "No timecard data found for the given criteria"]);
                    return;
                }
            } else {
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }
        break;

        case "POST":
            if (isset($data['dataTimeCard']['timecard_year'])) {
                $insertQuery = "INSERT INTO timecards (user_id, timecard_year, timecard_month, timecard_day, timecard_date, owner, timecard_temp, createdAt, updatedAt	) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";

                // echo $insertQuery
                $stmt = mysqli_prepare($db_conn, $insertQuery);

                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($db_conn)]);
                    exit();
                }

                mysqli_stmt_bind_param($stmt, "iiiissi", 
                    $data['dataTimeCard']['user_id'],
                    $data['dataTimeCard']['timecard_year'],
                    $data['dataTimeCard']['timecard_month'],
                    $data['dataTimeCard']['timecard_day'],
                    $data['dataTimeCard']['timecard_date'],
                    $data['dataTimeCard']['owner'],
                    $data['dataTimeCard']['timecard_temp'],
                );

                if (mysqli_stmt_execute($stmt)) {
                    $newTimecardId = mysqli_insert_id($db_conn);
                    http_response_code(201);
                    echo json_encode(["message" => "Thêm thành công", "id_timecard" => $newTimecardId]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Thêm không thành công: " . mysqli_error($db_conn)]);
                }

                mysqli_stmt_close($stmt);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Dữ liệu không hợp lệ. bị thiếu"]);
            }

        break;
    }
?>