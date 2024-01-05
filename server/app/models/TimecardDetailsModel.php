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
		function postUpdate($timecard_now, $timecard_originalclose, $timecard_interval, $overtime, $timecardId){
			global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $timecardId = isset($data["dataTime"]["id"]) ? $data["dataTime"]["id"] : null;
            $timecard_open = isset($data["dataTime"]["timecard_open"]) ? $data["dataTime"]["timecard_open"] : null;
            $timecard_now = isset($data["dataTime"]["timecard_now"]) ? $data["dataTime"]["timecard_now"] : null;
            // if ($timecardId !== null) {
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
                $opentime = $config_values["opentime"];
                $closetime = $config_values["closetime"];
                $openlunch = $config_values["openlunch"];
                $closelunch = $config_values["closelunch"];
            
                $dateTimeOpen = DateTime::createFromFormat($timeFormat, $timecard_open);
                $dateTimeNow = DateTime::createFromFormat($timeFormat, $timecard_now);
                $targetTime1 = DateTime::createFromFormat($timeFormat, $opentime);
                $targetTime2 = DateTime::createFromFormat($timeFormat, $closetime);
                $targetTime3 = DateTime::createFromFormat($timeFormat, $openlunch);
                $targetTime4 = DateTime::createFromFormat($timeFormat, $closelunch);

                $timestamp1 = $dateTimeOpen->getTimestamp();
                $timestamp2 = $dateTimeNow->getTimestamp();
                $timestamp3 = $targetTime3->getTimestamp();
                $timestamp4 = $targetTime4->getTimestamp();
                $timestamp5 = $targetTime2->getTimestamp();

                $totalTimestamp = ($timestamp2 - $timestamp4) + ($timestamp3 - $timestamp1);

                $totalDateTime = new DateTime();
                $totalDateTime->setTimestamp($totalTimestamp);

                if ($dateTimeNow < $targetTime3) {
                    $timecard_interval = ($dateTimeNow->diff($dateTimeOpen))->format('%H:%I');
                }
                elseif ($dateTimeNow < $targetTime4) {
                    $timecard_interval = ($dateTimeNow->diff($targetTime3))->format('%H:%I');
                }
                    else {
                    $timecard_interval = $totalDateTime->format('H:i');
                }
                if($timestamp2 > $timestamp5){
                    $overtime1 = $timestamp2 -$timestamp5;
                    $overtime2 = new DateTime();
                    $overtime = ($overtime2->setTimestamp($overtime1))->format('H:i');
                }
                else{
                    $overtime = "00:00";
                }
                $timecard_originalclose = $timecard_now;
                $sql = "UPDATE timecard_details SET timecard_close = ?, timecard_originalclose = ?, timecard_time= ?, timecard_timeover = ? WHERE id_groupwaretimecard = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssssi", $timecard_now, $timecard_originalclose, $timecard_interval, $overtime, $timecardId);

                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(["success" => true]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "error" => $stmt->error]);
                }

                $stmt->close();
            // } else {
            //     http_response_code(400);
            //     echo json_encode(["success" => false, "error" => "Invalid parameters"]);
            // }
        }
        function updateComment($comment,$id){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $id = isset($data["id"]) ? $data["id"] : null;
            $comment = isset($data["comment"]) ? $data["comment"] : null;
            // echo $id;
            // exit;
            // if ($id !== null && $comment !== null) {
                $sql = "UPDATE timecard_details SET timecard_comment = ? WHERE id_groupwaretimecard = ?";
                $stmt = $conn->prepare($sql);
                if (!$stmt) {
                    throw new Exception("Prepare failed: " . $conn->error);
                }
                $stmt->bind_param("si", $comment, $id);
                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(["success" => true]);
                } else {
                    throw new Exception("Execute failed: " . $stmt->error);
                }

                $stmt->close();
            // } else {
            //     http_response_code(400);
            //     echo json_encode(["success" => false, "error" => "Invalid parameters"]);
            // }
        }
    }
?>