<?php
    class ConfigModel{
        function getConfig(){
            global $conn;
            $allGroup = mysqli_query($conn, "SELECT * FROM configs");
            if(mysqli_num_rows($allGroup) > 0) {
                while ($row = mysqli_fetch_array($allGroup)) {
                    $json_array["configdata"][] = $row;
                }
                echo json_encode($json_array["configdata"]);
                return;
            } else {
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }
            $conn->close();
        }
    }
?>