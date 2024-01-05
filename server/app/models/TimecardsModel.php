<?php
    class TimecardsModel{
        function postAdd($user_id, $timecard_year, $timecard_month, $timecard_day, $timecard_date, $owner, $timecard_temp){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $insertQuery = "INSERT INTO timecards (user_id, timecard_year, timecard_month, timecard_day, timecard_date, owner, timecard_temp, createdAt, updatedAt	) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
            $stmt = mysqli_prepare($conn, $insertQuery);
            if (!$stmt) {
                http_response_code(500);
                echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
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
                $newTimecardId = mysqli_insert_id($conn);
                http_response_code(201);
                echo json_encode(["message" => "Thêm thành công", "id_timecard" => $newTimecardId]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Thêm không thành công: " . mysqli_error($conn)]);
            }
            $conn->close();
        }
        function updateTimecards($id){

        }
    }
?>