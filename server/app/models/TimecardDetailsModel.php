<?php
    class TimecardDetailsModel{
        function postAdd($id_groupwaretimecard, $timecard_open, $timecard_originalopen, $timecard_timeinterval){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $id_groupwaretimecard = $data['dataTimeCardDetails']['id_groupwaretimecard'];
            $timecard_open = $data['dataTimeCardDetails']['timecard_open'];
            $timecard_timeinterval = $data['dataTimeCardDetails']['timecard_timeinterval'];

            $sql = "INSERT INTO timecard_details(id_groupwaretimecard, timecard_open, timecard_originalopen, timecard_timeinterval, createdAt, updatedAt) VALUES ($id_groupwaretimecard, '$timecard_open', '$timecard_open', '$timecard_timeinterval', NOW(), NOW())";
            $result = $conn->query($sql);

            header('Content-Type: application/json');
            if($result) {
                echo json_encode(['success' => 'Thêm ngày nghỉ mới thành công']);
                return;
            } else {
                echo json_encode(['success' => 'Please check the Dayoffs data!']);
                return;
            }
            $conn->close();
        }
		function postUpdate($timecard_now, $timecard_originalclose, $timecard_interval, $overtime, $timecardId){
			global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $timecardId = isset($data["dataTime"]["id"]) ? $data["dataTime"]["id"] : null;
            $timecard_open = isset($data["dataTime"]["timecard_open"]) ? $data["dataTime"]["timecard_open"] : null;
            $timecard_now = isset($data["dataTime"]["timecard_now"]) ? $data["dataTime"]["timecard_now"] : null;
            $timecard_time = isset($data["dataTime"]["timecard_time"]) ? $data["dataTime"]["timecard_time"] : null;
            $timecard_timeover = isset($data["dataTime"]["timecard_timeover"]) ? $data["dataTime"]["timecard_timeover"] : null;
            
            
            $sql = "UPDATE timecard_details SET timecard_close = ?, timecard_originalclose = ?, timecard_time= ?, timecard_timeover = ? WHERE id_groupwaretimecard = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssi", $timecard_now, $timecard_now, $timecard_time, $timecard_timeover, $timecardId);

            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["success" => true]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "error" => $stmt->error]);
            }

            $stmt->close();
        }
        function updateComment($comment,$id){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $id = isset($data["id"]) ? $data["id"] : null;
            $comment = isset($data["comment"]) ? $data["comment"] : null;
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
        function updateAll(){
			global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'];
            $timecard_open = $data['timecard_open'];
            $timecard_close = $data['timecard_close'];
            $timecard_time = $data['timecard_time'];
            $timecard_timeover = $data['timecard_timeover'];
            $timecard_comment = $data['timecard_comment'];
            $editor = $data['editor'];
            

            $sql = "UPDATE timecard_details SET timecard_open = ?, timecard_close = ?, timecard_time = ?, timecard_timeover = ?, timecard_comment = ?, editor= ?, updatedAt = NOW()  WHERE id = $id";
            $stmt = $conn->prepare($sql);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            $stmt->bind_param("ssssss", $timecard_open, $timecard_close, $timecard_time, $timecard_timeover ,$timecard_comment, $editor);
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["success" => true]);
            } else {
                throw new Exception("Execute failed: " . $stmt->error);
            }

            $stmt->close();
        }
    }
?>