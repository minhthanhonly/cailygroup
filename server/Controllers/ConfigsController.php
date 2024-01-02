<?php
require('../database/DBConnect.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
}

$method = $_SERVER['REQUEST_METHOD'];
 $data = json_decode(file_get_contents("php://input"), true);

switch($method) {
        case "GET":
            $selectQuery = "SELECT config_key, config_value FROM configs WHERE config_key IN ('openhour', 'openminute', 'closehour', 'closeminute')";
            $result = mysqli_query($db_conn, $selectQuery);

            $response = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $response[$row['config_key']] = $row['config_value'];
            }

            http_response_code(200);
            echo json_encode($response);
            break;
        case "POST":
            // FUNCTION POST
        break;

        case "PUT":
            
            if (isset($data['method'])) {
                    $method = $data['method'];
                    switch ($method) {
                        case "UPDATE_LOGIN":
                            var_dump($data);
                            foreach ($data as $dataUpdate) {

                                $id = isset($data['id']) ? mysqli_real_escape_string($db_conn, $data['id']) : null;
                                $hour_value = isset($data['hours']) ? mysqli_real_escape_string($db_conn, $data['hours']) : 0;
                                $minute_value = isset($data['minutes']) ? mysqli_real_escape_string($db_conn, $data['minutes']) : 0;
                             
                              
                                    $updateQuery = "UPDATE configs SET config_value = '$hour_value' WHERE id = '$id' AND config_key = 'openhour'";
                                    error_log($updateQuery);
                                    mysqli_query($db_conn, $updateQuery);
                                    if (mysqli_query($db_conn, $updateQuery)) {
                                    http_response_code(200);
                                    echo json_encode(["message" => "Data update successfully giờ vào nè"]);
                                    } else {
                                        http_response_code(500);
                                        echo json_encode(["error" => "Failed to update data giờ vào nè"]);
                                    }
                            

                                
                                    $updateQuery = "UPDATE configs SET config_value = '$minute_value' WHERE id = '$id' AND config_key = 'openminute'";
                                    mysqli_query($db_conn, $updateQuery);
                                    if (mysqli_query($db_conn, $updateQuery)) {
                                        http_response_code(200);
                                        echo json_encode(["message" => "Data update successfully phút vào nè"]);
                                        } else {
                                            http_response_code(500);
                                            echo json_encode(["error" => "Failed to update data phút vào nè"]);
                                        }
                              
                                
                            }
                        break;
                        case "UPDATE_OUTTIME":
                             var_dump($dataUpdateOut) ;
                            foreach ($data as $dataUpdateOut) {
            
                                $id = isset($data['id']) ? mysqli_real_escape_string($db_conn, $data['id']) : null;
                                $hour_value = isset($data['hours']) ? mysqli_real_escape_string($db_conn, $data['hours']) : NULL;
                                $minute_value = isset($data['minutes']) ? mysqli_real_escape_string($db_conn, $data['minutes']) : NULL;

                                  var_dump($hour_value, $minute_value); // Xem giá trị của giờ và phút
                               
                                        $updateQuery = "UPDATE configs SET config_value = '$hour_value' WHERE id = '$id' AND config_key = 'closehour'";
                                        var_dump($updateQuery);
                                        mysqli_query($db_conn, $updateQuery);
                                        if (mysqli_query($db_conn, $updateQuery)) {
                                        http_response_code(200);
                                        echo json_encode(["message" => "Data update successfully giờ out nè"]);
                                        } else {
                                            http_response_code(500);
                                            echo json_encode(["error" => "Failed to update data giờ out nè"]);
                                        }
                                 

                                  
                                        $updateQuery = "UPDATE configs SET config_value = '$minute_value' WHERE id = '$id' AND config_key = 'closeminute'";
                                        mysqli_query($db_conn, $updateQuery);
                                        if (mysqli_query($db_conn, $updateQuery)) {
                                            http_response_code(200);
                                            echo json_encode(["message" => "Data update successfully phút out nè"]);
                                            } else {
                                                http_response_code(500);
                                                echo json_encode(["error" => "Failed to update data phút out nè"]);
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
        break;

    }
?>