<?php
    class HolidaysModel{
        function getHolidays(){
            global $conn;
            $allHolidays = mysqli_query($conn, "SELECT * FROM holidays");
            if(mysqli_num_rows($allHolidays) > 0) {
                while($row = mysqli_fetch_array($allHolidays)) {
                    $json_array["allHolidays"][] = array("name" => $row['name'], "days" => $row['days']);
                }
                echo json_encode($json_array["allHolidays"]);
                return;
            } else {
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }
            $conn->close();
        }
    }

?>