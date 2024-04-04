<?php
    class TabContentModel{
        function getTabContent(){
            global $conn;
            $allRegister = mysqli_query($conn, "SELECT * FROM register");
            if(mysqli_num_rows($allRegister) > 0) {
                while($row = mysqli_fetch_array($allRegister)) {
                    $json_array["registerdata"][] = array("id" => $row['id'], "name" => $row['name'],"realname" => $row['realname'], "date" => $row['date'], "time" => $row['time'], "destination" => $row['destination'], "status" => $row['status'], "note" => $row['note'] ,"status_attr" => $row["status_attr"],"owner" => $row["owner"]);
                }
                echo json_encode($json_array["registerdata"]);
                return;
            } else {
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }
            $conn->close();
        }
        function getAplication(){
            global $conn;
            $groupFilter = isset($_GET['group']) ? mysqli_real_escape_string($conn, $_GET['group']) : '-1';
            $query = "SELECT *  FROM register";
            // echo $query;
            // exit;
            if ($groupFilter != -1) {
                $query .= " WHERE status = $groupFilter";
            }
            $allGroup = mysqli_query($conn, $query);

            if ($allGroup) {
                $data = [];

                while ($row = mysqli_fetch_assoc($allGroup)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data,JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(500);
                echo json_encode(['errCode' => 1, 'message' => 'không thể tìm thấy ngày nghỉ của người dùng']);
            }
            $conn->close();
        }
        function getComment(){
            global $conn;

            $comment = mysqli_query($conn, "SELECT * FROM comment JOIN users ON comment.user_id = users.id");
            if ($comment) {
                $data = [];

                while ($row = mysqli_fetch_assoc($comment)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data,JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(500);
                echo json_encode(['errCode' => 1, 'message' => 'không thể tìm thấy ngày nghỉ của người dùng']);
            }
            $conn->close();
        }
    }
?>