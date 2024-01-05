<?php
    class TimecardDetailsModel{
        function postAdd($id_groupwaretimecard, $timecard_open, $timecard_originalopen, $timecard_timeinterval){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $config_keys = ["opentime", "closetime", "openlunch", "closelunch"];
            $config_values = [];
            $placeholders = str_repeat('?, ', count($config_keys) - 1) . '?';
            $config_sql = "SELECT config_key, config_value FROM configs WHERE config_key IN ($placeholders)";
            $stmt_config = $conn->prepare($config_sql);
            $types = str_repeat('s', count($config_keys)); 
            $stmt_config->bind_param($types, ...$config_keys);
            $stmt_config->execute();
            $stmt_config->bind_result($config_key, $config_value);
            while ($stmt_config->fetch()) {
                $config_values[$config_key] = $config_value;
            }
            $stmt_config->close();
            $timeFormat = 'H:i';
            $openlunch = $config_values["openlunch"];
            $closelunch = $config_values["closelunch"];
            $targetTime1 = DateTime::createFromFormat($timeFormat, $openlunch);
            $targetTime2 = DateTime::createFromFormat($timeFormat, $closelunch);
            $targetTime3 = $targetTime2->diff($targetTime1);

            $insertQuery = "INSERT INTO `timecard_details`(`id_groupwaretimecard`, `timecard_open`, `timecard_originalopen`, `timecard_timeinterval`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, NOW(), NOW())";

            $stmt = mysqli_prepare($conn, $insertQuery);
            
            if (!$stmt) {
                http_response_code(500);
                echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                exit();
            }

            mysqli_stmt_bind_param($stmt, "isss", 
                $data['dataTimeCardDetails']['id_groupwaretimecard'],
                $data['dataTimeCardDetails']['timecard_open'],
                $data['dataTimeCardDetails']['timecard_open'],
                $targetTime3->format('%H:%I'),
            );
            if (mysqli_stmt_execute($stmt)) {
                http_response_code(201);
                echo json_encode(["message" => "Thêm thành công"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Thêm không thành công"]);
            }
            $conn->close();
        }
    }
?>