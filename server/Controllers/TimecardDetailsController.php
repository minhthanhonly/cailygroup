<?php
    require('../database/DBConnect.php');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit;
}

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


           $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['group_data']['id_groupwaretimecard'])) {
        $insertQuery = "INSERT INTO timecard_details (id_groupwaretimecard, timecard_open, timecard_close, timecard_originalopen, timecard_originalclose, timecard_interval, timecard_originalinterval, timecard_time, timecard_timeover, timecard_timeinterval, timecard_comment , createdAt) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

        $stmt = mysqli_prepare($db_conn, $insertQuery);

        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($db_conn)]);
            exit();
        }

        mysqli_stmt_bind_param($stmt, "sis", 
            $data['group_data']['id_groupwaretimecard'],
            $data['group_data']['timecard_open'],
            $data['group_data']['timecard_close'],
            $data['group_data']['timecard_originalopen'],
            $data['group_data']['timecard_originalclose'],
            $data['group_data']['timecard_interval'],
            $data['group_data']['timecard_originalinterval'],
            $data['group_data']['timecard_time'],
            $data['group_data']['timecard_timeover'],
            $data['group_data']['timecard_timeinterval'],
            $data['group_data']['timecard_comment'],
            // $data['group_data']['createdAt'],
        );

        if (mysqli_stmt_execute($stmt)) {
            http_response_code(201);
            echo json_encode(["message" => "Thêm thành công"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Thêm không thành công: " . mysqli_error($db_conn)]);
        }

        mysqli_stmt_close($stmt);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Dữ liệu không hợp lệ. 'group_name' bị thiếu"]);
    }
    break;

    }   
?>