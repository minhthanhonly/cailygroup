<?php
require('../database/DBConnect.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
 $data = json_decode(file_get_contents("php://input"), true);
switch($method) {
        case "GET":
            // FUNCTION GET
        break;

        case "POST":
            // FUNCTION POST
        break;

        case "PUT":
            
            if (isset($data['method'])) {
                    $method = $data['method'];
                    switch ($method) {
                        case "UPDATE_LOGIN":
                            foreach ($data as $dataUpdate) {
            
                                $id = isset($data['id']) ? mysqli_real_escape_string($db_conn, $data['id']) : null;
                                $hour_value = isset($data['hours']) ? mysqli_real_escape_string($db_conn, $data['hours']) : null;
                                $minute_value = isset($data['minutes']) ? mysqli_real_escape_string($db_conn, $data['minutes']) : null;

                                if (!empty($hour_value)) {
                                    $updateQuery = "UPDATE configs SET config_value = '$hour_value' WHERE id = '$id' AND config_key = 'openhour'";
                                    mysqli_query($db_conn, $updateQuery);
                                    // if (mysqli_query($db_conn, $updateQuery)) {
                                    // http_response_code(200);
                                    // echo json_encode(["message" => "Data update successfully giờ vào nè"]);
                                    // } else {
                                    //     http_response_code(500);
                                    //     echo json_encode(["error" => "Failed to update data giờ vào nè"]);
                                    // }
                                }

                                if (!empty($minute_value)) {
                                    $updateQuery = "UPDATE configs SET config_value = '$minute_value' WHERE id = '$id' AND config_key = 'openminute'";
                                    mysqli_query($db_conn, $updateQuery);
                                    // if (mysqli_query($db_conn, $updateQuery)) {
                                    //     http_response_code(200);
                                    //     echo json_encode(["message" => "Data update successfully phút vào nè"]);
                                    //     } else {
                                    //         http_response_code(500);
                                    //         echo json_encode(["error" => "Failed to update data phút vào nè"]);
                                    //     }
                                }
                                
                            }
                        break;
                        case "UPDATE_OUTTIME":
                            foreach ($data as $dataUpdate) {
            
                                $id = isset($data['id']) ? mysqli_real_escape_string($db_conn, $data['id']) : null;
                                $hour_value = isset($data['hours']) ? mysqli_real_escape_string($db_conn, $data['hours']) : null;
                                $minute_value = isset($data['minutes']) ? mysqli_real_escape_string($db_conn, $data['minutes']) : null;
                                    if (!empty($hour_value)) {
                                        $updateQuery = "UPDATE configs SET config_value = '$hour_value' WHERE id = '$id' AND config_key = 'closehour'";
                                        mysqli_query($db_conn, $updateQuery);
                                        // if (mysqli_query($db_conn, $updateQuery)) {
                                        // http_response_code(200);
                                        // echo json_encode(["message" => "Data update successfully giờ out nè"]);
                                        // } else {
                                        //     http_response_code(500);
                                        //     echo json_encode(["error" => "Failed to update data giờ out nè"]);
                                        // }
                                    }

                                    if (!empty($minute_value)) {
                                        $updateQuery = "UPDATE configs SET config_value = '$minute_value' WHERE id = '$id' AND config_key = 'closeminute'";
                                        mysqli_query($db_conn, $updateQuery);
                                        // if (mysqli_query($db_conn, $updateQuery)) {
                                        //     http_response_code(200);
                                        //     echo json_encode(["message" => "Data update successfully phút out nè"]);
                                        //     } else {
                                        //         http_response_code(500);
                                        //         echo json_encode(["error" => "Failed to update data phút out nè"]);
                                        //     }
                                    }
                                    
                                }
                            break;
                        // Thêm các phương thức khác nếu cần
                        default:
                            http_response_code(400);
                            echo json_encode(["error" => "Invalid method"]);
                            break;
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Method not specified"]);
}
       
        
        

        // Bạn không cần phải thực hiện mysqli_query một lần nữa ở đây, vì đã thực hiện trong vòng lặp

        // http_response_code(200);
        // echo json_encode(["message" => "Data update successfully"]);


        break;

    }
?>