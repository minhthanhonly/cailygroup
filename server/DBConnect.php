<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    $db_conn = mysqli_connect("localhost", "root", "", "cailygroupdb");
    if($db_conn===false) {
        die("ERROR: Could Not Connect".mysqli_connect_error());
    }

    $method = $_SERVER['REQUEST_METHOD'];
    // echo "test----".$method; die;

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
    }
?>