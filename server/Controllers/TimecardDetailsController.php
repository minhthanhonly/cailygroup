<?php
    require('../database/DBConnect.php');
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case "GET":
              $allGroup = mysqli_query($db_conn, "SELECT * FROM timecard_details");

            
            if(mysqli_num_rows($allGroup) > 0) {
                while($row = mysqli_fetch_array($allGroup)) {
                    $json_array["timecard_detailsdata"][] = array(
                        "id" => $row['id'],
                        "id_groupwaretimecard" => $row['id_groupwaretimecard'],
                        "timecard_open" => $row['timecard_open'],
                        "timecard_close" => $row['timecard_close'],
                        "timecard_originalopen" => $row['timecard_originalopen'],
                        "timecard_originalclose" => $row['timecard_originalclose'],
                        "timecard_interval" => $row['timecard_interval'],
                        "timecard_originalinterval" => $row['timecard_originalinterval'],
                        "timecard_time" => $row['timecard_time'],
                        "timecard_timeover" => $row['timecard_timeover'],
                        "timecard_timeinterval" => $row['timecard_timeinterval'],
                        "timecard_comment" => $row['timecard_comment'],
                    );
                }
                echo json_encode($json_array["timecard_detailsdata"]);
                return;
            } else {
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }
        break;

        case "POST":
            // FUNCTION POST
        break;
    }
?>