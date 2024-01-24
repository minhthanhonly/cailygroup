<?php
    class TimecardsModel{
        function getTimecardUser($id) {
            global $conn;
            $todayDate = date("d-m-Y");
            $sql = "SELECT td.timecard_open, td.timecard_close, td.	id_groupwaretimecard
                FROM timecard_details td
                INNER JOIN timecards tc ON td.id_groupwaretimecard = tc.id
                WHERE tc.user_id = $id AND tc.timecard_date = '$todayDate'";
            $result = mysqli_query($conn, $sql);
            if (mysqli_num_rows($result) >= 0) {
                $row = mysqli_fetch_assoc($result);
                echo json_encode($row);
            } else {
                echo json_encode(['errCode' => 1, "message" => "Không tìm thấy timecards của người dùng"]);
                return;
            }
        }

        function getTimecards($id){
            global $conn;
            $allTimecards = mysqli_query($conn, "SELECT * FROM timecards  WHERE user_id = $id");
            if (mysqli_num_rows($allTimecards) > 0) {
                $json_array["timecarddata"] = array();

                while ($row = mysqli_fetch_array($allTimecards)) {
                    $timecardId = $row['id'];
                    $timecardDate = $row['timecard_date'];

                    $timecardDetailsQuery = "SELECT td.* 
                                            FROM timecard_details td
                                            WHERE td.id_groupwaretimecard = ?";
                    $stmtDetails = mysqli_prepare($conn, $timecardDetailsQuery);

                    if ($stmtDetails) {
                        mysqli_stmt_bind_param($stmtDetails, "i", $timecardId);
                        mysqli_stmt_execute($stmtDetails);
                        $result = mysqli_stmt_get_result($stmtDetails);

                        while ($rowDetails = mysqli_fetch_assoc($result)) {
                            $rowDetails["timecard_date"] = $timecardDate; 
                            $json_array["timecarddata"][] = $rowDetails;
                        }
                    }
                }
                echo json_encode($json_array["timecarddata"]);
                return;
            } else {
                echo json_encode(['errCode' => 1, "message" => "Không tìm thấy timecards của người dùng"]);
                return;
            }
        }
        function postAdd($user_id, $timecard_year, $timecard_month, $timecard_day, $timecard_date, $owner, $timecard_temp){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $user_id = $data['dataTimeCard']['user_id'];
            $timecard_year = $data['dataTimeCard']['timecard_year'];
            $timecard_month = $data['dataTimeCard']['timecard_month'];
            $timecard_day = $data['dataTimeCard']['timecard_day'];
            $timecard_date = $data['dataTimeCard']['timecard_date'];
            $owner = $data['dataTimeCard']['owner'];
            $timecard_temp = $data['dataTimeCard']['timecard_temp'];
            $sql = "INSERT INTO timecards (user_id, timecard_year, timecard_month, timecard_day, timecard_date, owner, timecard_temp, createdAt) 
                                VALUES ($user_id, $timecard_year, $timecard_month, $timecard_day, '$timecard_date', '$owner', $timecard_temp, NOW())";
            $result = $conn->query($sql);

            header('Content-Type: application/json');
            if($result) {
                $newTimecardId = mysqli_insert_id($conn);
                http_response_code(201);
                echo json_encode(["message" => "Thêm thành công", "id_timecard" => $newTimecardId]);
                return;
            } else {
                echo json_encode(['errCode' => 1, "message" => "Thêm không thành công"]);
                return;
            }
            $conn->close();
        }
    }
?>