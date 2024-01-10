<?php
    class DayoffsModel{
        function postAdd($user_id, $date, $time_start, $time_end, $note, $day_number, $status, $owner){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            $insertQuery = "INSERT INTO dayoffs (user_id, date, time_start, time_end, note, day_number, status, owner, createdAt) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";
            $stmt = mysqli_prepare($conn, $insertQuery);
            mysqli_stmt_bind_param($stmt, "issssiss", 
                $data['group_data']['user_id'],
                $data['group_data']['date'],
                $data['group_data']['time_start'],
                $data['group_data']['time_end'],
                $data['group_data']['note'],
                $data['group_data']['day_number'],
                $data['group_data']['status'],
                $data['group_data']['owner'],
            );

            if (mysqli_stmt_execute($stmt)) {
                http_response_code(201);
                echo json_encode(["message" => "Thêm thành công"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Thêm không thành công"]);
            }
            $conn->close();
        }
        
        function getDayoffs(){
            global $conn;
            
            $groupFilter = isset($_GET['group']) ? mysqli_real_escape_string($conn, $_GET['group']) : 'all';

            $query = "SELECT dayoffs.*, 
                        CONCAT(dayoffs.time_start, ' - ' , dayoffs.date) AS start_datetime, 
                        CONCAT(dayoffs.time_end, ' - ', dayoffs.date) AS end_datetime, 
                        users.realname,
                        groups.group_name
                FROM dayoffs
                JOIN users ON dayoffs.user_id = users.id
                JOIN groups ON users.user_group = groups.id";

            if ($groupFilter !== 'all') {
                $query .= " WHERE groups.id = '$groupFilter'";
            }

            $allGroup = mysqli_query($conn, $query);

            if ($allGroup) {
                $data = [];

                while ($row = mysqli_fetch_assoc($allGroup)) {
                    $row['start_datetime'] = $row['start_datetime'];
                    $row['end_datetime'] = $row['end_datetime'];
                    $data[] = $row;
                }

                if (!empty($data)) {
                    http_response_code(200);
                    echo json_encode($data);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "No data found with the specified group"]);
                }
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Internal Server Error"]);
            }
            $conn->close();
        }
        // function getDayoffs(){
        //     global $conn;
            
        //     $groupFilter = isset($_GET['group']) ? mysqli_real_escape_string($conn, $_GET['group']) : 'all';

        //     $query = "SELECT dayoffs.*, 
        //                 CONCAT(dayoffs.time_start, ' - ' , dayoffs.date_start) AS start_datetime, 
        //                 CONCAT(dayoffs.time_end, ' - ', dayoffs.date_end) AS end_datetime, 
        //                 users.realname,
        //                 groups.group_name
        //         FROM dayoffs
        //         JOIN users ON dayoffs.user_id = users.id
        //         JOIN groups ON users.user_group = groups.id";

        //     if ($groupFilter !== 'all') {
        //         $query .= " WHERE groups.id = '$groupFilter'";
        //     }

        //     $allGroup = mysqli_query($conn, $query);

        //     if ($allGroup) {
        //         $data = [];

        //         while ($row = mysqli_fetch_assoc($allGroup)) {
        //             $row['start_datetime'] = $row['start_datetime'];
        //             $row['end_datetime'] = $row['end_datetime'];
        //             $data[] = $row;
        //         }

        //         if (!empty($data)) {
        //             http_response_code(200);
        //             echo json_encode($data);
        //         } else {
        //             http_response_code(404);
        //             echo json_encode(["error" => "No data found with the specified group"]);
        //         }
        //     } else {
        //         http_response_code(500);
        //         echo json_encode(["error" => "Internal Server Error"]);
        //     }
        //     $conn->close();
        // }
        // function postAdd($user_id, $date_start, $date_end, $time_start, $time_end, $note, $day_number, $status, $owner){
        //     global $conn;
        //     $data = json_decode(file_get_contents("php://input"), true);
        //     $insertQuery = "INSERT INTO dayoffs (user_id, date_start, date_end, time_start, time_end, note, day_number, status, owner, createdAt) 
        //                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
        //     $stmt = mysqli_prepare($conn, $insertQuery);
        //     mysqli_stmt_bind_param($stmt, "isssssiss", 
        //         $data['group_data']['user_id'],
        //         $data['group_data']['date_start'],
        //         $data['group_data']['date_end'],
        //         $data['group_data']['time_start'],
        //         $data['group_data']['time_end'],
        //         $data['group_data']['note'],
        //         $data['group_data']['day_number'],
        //         $data['group_data']['status'],
        //         $data['group_data']['owner'],
        //     );

        //     if (mysqli_stmt_execute($stmt)) {
        //         http_response_code(201);
        //         echo json_encode(["message" => "Thêm thành công"]);
        //     } else {
        //         http_response_code(500);
        //         echo json_encode(["error" => "Thêm không thành công"]);
        //     }
        //     $conn->close();
        // }
        function getDayoffsUser($id){
            global $conn;
            $query = "SELECT * FROM dayoffs WHERE user_id = '$id'";
            $result = $conn->query($query);

            if ($result) {
                // Chuyển kết quả thành mảng để trả về
                $dayoffs = array();
                while ($row = $result->fetch_assoc()) {
                    $dayoffs[] = $row;
                }

                // Đóng kết nối
                $conn->close();

                // Trả về kết quả dưới dạng JSON
                echo json_encode($dayoffs);
            } else {
                // Xử lý lỗi nếu có
                echo json_encode(array('error' => 'Error in query'));
            }
        }
        function deleteDayoffs($id){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($id)) {
                // $id = mysqli_real_escape_string($conn, $data['id']);

                $deleteQuery = "DELETE FROM dayoffs WHERE id = $id";

                if (mysqli_query($conn, $deleteQuery)) {
                    http_response_code(200);
                    echo json_encode(["message" => "Data deleted successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Failed to delete data"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Invalid data"]);
            }
            $conn->close();
        }
        function updateDayoffs($id){
            global $conn;
            if (isset($id)) {
                // Cập nhật trạng thái trong cơ sở dữ liệu
                $status = 1;
                $sql = "UPDATE dayoffs SET status = ? WHERE id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ii", $status, $id);

                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(["success" => true]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "error" => $stmt->error]);
                }

                $stmt->close();
            } else {
                http_response_code(400);
                echo json_encode(["success" => false, "error" => "Invalid parameters"]);
            }
        }
    }

?>