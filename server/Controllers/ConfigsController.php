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
switch ($method) {
    case "GET":
        $selectQuery = "SELECT config_key, config_value FROM configs WHERE config_key IN ('opentime', 'closetime')";
        $result = mysqli_query($db_conn, $selectQuery);

        $response = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $response[$row['config_key']] = $row['config_value'];
        }

        http_response_code(200);
        echo json_encode($response);
        break;
    case "POST":
        // Xử lý khi có yêu cầu POST
        break;
    case "PUT":
          
        if (isset($data['method'])) {
            $method = $data['method'];
           
            switch ($method) {
                 case "UPDATE_LOGIN":
                        
                   $id = isset($data['data'][0]['id']) ? mysqli_real_escape_string($db_conn, $data['data'][0]['id']) : null;
                   $opentime = isset($data['data'][0]['hours']) && isset($data['data'][0]['minutes']) ? mysqli_real_escape_string($db_conn, $data['data'][0]['hours'] . ':' . $data['data'][0]['minutes']) : '00:00';



                   $updateQuery = "UPDATE configs SET config_value = '$opentime' WHERE id = '$id' AND config_key = 'opentime'";
                    
                    

                  $result = mysqli_query($db_conn, $updateQuery);

                    if ($result) {
                        http_response_code(200);
                        echo json_encode(["message" => "Cập nhật dữ liệu thành công cho giờ vào"]);
                    } else {
                        http_response_code(500);
                        echo json_encode(["error" => "Không thể cập nhật dữ liệu cho giờ vào: " . mysqli_error($db_conn)]);
                    }
                    break;
                case "UPDATE_OUTTIME":
                     $id = isset($data['data'][0]['id']) ? mysqli_real_escape_string($db_conn, $data['data'][0]['id']) : null;
                   $opentime = isset($data['data'][0]['hours']) && isset($data['data'][0]['minutes']) ? mysqli_real_escape_string($db_conn, $data['data'][0]['hours'] . ':' . $data['data'][0]['minutes']) : '00:00';



                   $updateQuery = "UPDATE configs SET config_value = '$opentime' WHERE id = '$id' AND config_key = 'closetime'";
                    
                    

                  $result = mysqli_query($db_conn, $updateQuery);

                    if ($result) {
                        http_response_code(200);
                        echo json_encode(["message" => "Cập nhật dữ liệu thành công cho giờ ra"]);
                    } else {
                        http_response_code(500);
                        echo json_encode(["error" => "Không thể cập nhật dữ liệu cho giờ vào: " . mysqli_error($db_conn)]);
                    }
                    break;
                // Thêm các phương thức khác nếu cần
                default:
                    http_response_code(400);
                    echo json_encode(["error" => "Phương thức không hợp lệ"]);
                    break;
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Phương thức không được chỉ định"]);
        }
        break;
}
?>