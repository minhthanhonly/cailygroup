<?php
    require('../database/DBConnect.php');
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case "GET":
            $allGroup = mysqli_query($db_conn, "SELECT * FROM groups");
            if(mysqli_num_rows($allGroup) > 0) {
                while($row = mysqli_fetch_array($allGroup)) {
                    $json_array["groupdata"][] = array("id" => $row['id'], "group_name" => $row['group_name']);
                }
                echo json_encode($json_array["groupdata"]);
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