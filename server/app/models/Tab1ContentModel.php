<?php
    class Tab1ContentModel{
        function getTab1Content(){
            global $conn;
            $allRegister = mysqli_query($conn, "SELECT * FROM register");
            if(mysqli_num_rows($allRegister) > 0) {
                while($row = mysqli_fetch_array($allRegister)) {
                    $json_array["registerdata"][] = array("id" => $row['id'], "name" => $row['name'], "date" => $row['date'], "time" => $row['time'], "destination" => $row['destination']);
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