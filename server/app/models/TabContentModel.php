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
    }
?>