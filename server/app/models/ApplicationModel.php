<?php
    class ApplicationModel{


        function getApplication(){
            global $conn;
            $statusFilter = isset($_GET['id_status']) ? mysqli_real_escape_string($conn, $_GET['id_status']) : '-1';
            $sql = "SELECT * FROM table_json";
            if ($statusFilter != -1) {
                $sql .= " WHERE id_status = $statusFilter"; // Sửa từ $query thành $sql
            }
           // echo $sql; // In ra câu truy vấn để kiểm tra
            $result = $conn->query($sql);
            $data = array();
            if ($result->num_rows > 0) {
               while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
            }
            $conn->close();
            // Trả về dữ liệu dưới dạng JSON
            header('Content-Type: application/json');
            echo json_encode($data);
            return;
        }

        function getApplicationForId($id){
            global $conn;
            $sql = "SELECT *
                    FROM table_json 
                    WHERE table_json.id = $id";
            $result = $conn->query($sql);
            $register = null;

            if ($result && $result->num_rows > 0) {
                $register = $result->fetch_assoc(); // Lấy ra đối tượng từ kết quả truy vấn
            } else {
                // Nếu không có dòng nào khớp với id, trả về một đối tượng trống
                $register = new stdClass();
            }

            echo json_encode($register); // Trả về đối tượng JSON
            $conn->close();
        }

        function updateStatus($id, $id_status) {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "PUT") {
                $groupUpdateData = json_decode(file_get_contents("php://input"), true);
                if (isset($groupUpdateData['id'], $groupUpdateData['id_status'])) {
                    $id = mysqli_real_escape_string($conn, $groupUpdateData['id']);
                    $id_status = mysqli_real_escape_string($conn, $groupUpdateData['id_status']);
                    mysqli_query($conn, "SET time_zone = '+07:00'");
                    // Lấy dữ liệu JSON từ cột tablejson
                    $selectQuery = "SELECT JSON_EXTRACT(tablejson, '$.id_status') AS id_status FROM table_json WHERE id = '$id'";
                    $result = mysqli_query($conn, $selectQuery);
                    $row = mysqli_fetch_assoc($result);
                   
                    $current_json = json_decode($row['id_status'], true);
                    if (isset($current_json)) {
                        $current_json = $id_status;
                        $new_json = json_encode($current_json);
                        $updateQuery = "UPDATE table_json SET tablejson = JSON_SET(tablejson, '$.id_status', $new_json), id_status = '$id_status', createdAt = NOW() WHERE id ='$id'";
        
                        if (mysqli_query($conn, $updateQuery)) {
                            http_response_code(200);
                            echo json_encode(["message" => "Dữ liệu được cập nhật thành công"]);
                        } else {
                            http_response_code(500);
                            echo json_encode(["error" => "Không thể cập nhật dữ liệu"]);
                        }
                    } else {
                        http_response_code(400);
                        echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
                }
                $conn->close();
            }
        }
        
        
        // function getComment($id){
        //     global $conn;
        //     $query = "SELECT comment.*,
        //                 users.realname,
        //                 comment.createdAt AS createdAt
        //             FROM comment
        //             JOIN users ON comment.user_id = users.id
        //             JOIN table_json ON table_json.id = comment.id_tablejson
        //             JOIN table_register ON table_register.id = comment.table_id
        //             WHERE comment.id_tablejson = $id";
        //     echo $query;
        //     exit();
        //     $allGroup = mysqli_query($conn, $query);
        //         $data = [];

        //         while ($row = mysqli_fetch_assoc($allGroup)) {
        //             $data[] = $row;
        //         }
        //         http_response_code(200);
        //         echo json_encode($data);
        //     $conn->close();
        // }

        

        function getCommentForUserFirst($id){
            global $conn;
            $selectQuery = "SELECT comment.*,
                        users.realname,
                        authority.authority_name,
                        comment.createdAt AS createdAt
                    FROM comment
                    JOIN users ON comment.user_id = users.id
                    JOIN table_json ON table_json.id = comment.id_tablejson
                    JOIN authority ON comment.authority = authority.id
                    WHERE comment.id_tablejson  = $id and comment.authority = 1";
            $result = mysqli_query($conn, $selectQuery);
                $data = [];

                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data);
            $conn->close();
        }
        function addComment($user_id,$id_tablejson,$table_id,$authority, $note, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $commentPostData = json_decode(file_get_contents("php://input"));
                $user_id = $commentPostData->user_id;
                $id_tablejson = $commentPostData->id_tablejson;
                $table_id = $commentPostData->table_id;
                $authority = $commentPostData->authority;
                $note = trim($commentPostData->note); // Loại bỏ các khoảng trắng dư thừa
                if (empty($note)) {
                    http_response_code(400);
                    echo json_encode(["error" => "Không thể thêm comment: Nội dung trống"]);
                    exit();
                }
                $insertQuery = "INSERT INTO comment (user_id,id_tablejson,table_id,authority, note, createdAt) 
                            VALUES (?, ?, ?, ?,?,NOW())";
                $stmt = mysqli_prepare($conn, $insertQuery);

                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }
                mysqli_stmt_bind_param($stmt, "siiss", $user_id, $id_tablejson,$table_id,$authority, $note);

                if (mysqli_stmt_execute($stmt)) {
                    http_response_code(201);
                    echo json_encode(["message" => "Thêm thành công"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Thêm không thành công: " . mysqli_error($conn)]);
                }

                mysqli_stmt_close($stmt);
            }
        }
        function deleteCommentFirst($id){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($id)) {
                $deleteQuery = "DELETE FROM comment WHERE id = $id";
                if (mysqli_query($conn, $deleteQuery)) {
                    http_response_code(200);
                echo json_encode(['errCode' => 0]);
                } else {
                    http_response_code(500);
                echo json_encode(['errCode' => 1, 'message' => 'không thể Xóa comment']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['errCode' => 2, 'message' => 'không thể tìm thấy comment của người dùng']);
            }
            $conn->close();
        }

        function getCommentForUserSecond($id){
            global $conn;
            $selectQuery = "SELECT comment.*,
                        users.realname,
                        authority.authority_name,
                        comment.createdAt AS createdAt
                    FROM comment
                    JOIN users ON comment.user_id = users.id
                    JOIN table_json ON table_json.id = comment.id_tablejson
                    JOIN authority ON comment.authority = authority.id
                    WHERE comment.id_tablejson  = $id and comment.authority = 2";
            $result = mysqli_query($conn, $selectQuery);
                $data = [];

                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data);
            $conn->close();
        }
        function addCommentSeCond($user_id,$id_tablejson,$table_id,$authority, $note, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $commentPostData = json_decode(file_get_contents("php://input"));
                $user_id = $commentPostData->user_id;
                $id_tablejson = $commentPostData->id_tablejson;
                $table_id = $commentPostData->table_id;
                $authority = $commentPostData->authority;
                $note = trim($commentPostData->note); // Loại bỏ các khoảng trắng dư thừa
                if (empty($note)) {
                    http_response_code(400);
                    echo json_encode(["error" => "Không thể thêm comment: Nội dung trống"]);
                    exit();
                }
                $insertQuery = "INSERT INTO comment (user_id,id_tablejson,table_id,authority, note, createdAt) 
                            VALUES (?, ?, ?, ?,?,NOW())";
                $stmt = mysqli_prepare($conn, $insertQuery);

                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }
                mysqli_stmt_bind_param($stmt, "siiss", $user_id, $id_tablejson,$table_id,$authority, $note);

                if (mysqli_stmt_execute($stmt)) {
                    http_response_code(201);
                    echo json_encode(["message" => "Thêm thành công"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Thêm không thành công: " . mysqli_error($conn)]);
                }

                mysqli_stmt_close($stmt);
            }
        }
        function deleteCommentSeCond($id){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($id)) {
                $deleteQuery = "DELETE FROM comment WHERE id = $id";
                if (mysqli_query($conn, $deleteQuery)) {
                    http_response_code(200);
                echo json_encode(['errCode' => 0]);
                } else {
                    http_response_code(500);
                echo json_encode(['errCode' => 1, 'message' => 'không thể Xóa comment']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['errCode' => 2, 'message' => 'không thể tìm thấy comment của người dùng']);
            }
            $conn->close();
        }

        function getCommentForUserThird($id){
            global $conn;
            $selectQuery = "SELECT comment.*,
                        users.realname,
                        authority.authority_name,
                        comment.createdAt AS createdAt
                    FROM comment
                    JOIN users ON comment.user_id = users.id
                    JOIN table_json ON table_json.id = comment.id_tablejson
                    JOIN authority ON comment.authority = authority.id
                    WHERE comment.id_tablejson  = $id and comment.authority = 3";
            $result = mysqli_query($conn, $selectQuery);
                $data = [];

                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data);
            $conn->close();
        }
        
        
        function deleteCommentThird($id){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($id)) {
                $deleteQuery = "DELETE FROM comment WHERE id = $id";
                if (mysqli_query($conn, $deleteQuery)) {
                    http_response_code(200);
                echo json_encode(['errCode' => 0]);
                } else {
                    http_response_code(500);
                echo json_encode(['errCode' => 1, 'message' => 'không thể Xóa comment']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['errCode' => 2, 'message' => 'không thể tìm thấy comment của người dùng']);
            }
            $conn->close();
        }
       
        
        function addCommentThird($user_id,$id_tablejson,$table_id,$authority, $note, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $commentPostData = json_decode(file_get_contents("php://input"));
                $user_id = $commentPostData->user_id;
                $id_tablejson = $commentPostData->id_tablejson;
                $table_id = $commentPostData->table_id;
                $authority = $commentPostData->authority;
                $note = trim($commentPostData->note); // Loại bỏ các khoảng trắng dư thừa
                if (empty($note)) {
                    http_response_code(400);
                    echo json_encode(["error" => "Không thể thêm comment: Nội dung trống"]);
                    exit();
                }
                $insertQuery = "INSERT INTO comment (user_id,id_tablejson,table_id,authority, note, createdAt) 
                            VALUES (?, ?, ?, ?,?,NOW())";
                $stmt = mysqli_prepare($conn, $insertQuery);

                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }
                mysqli_stmt_bind_param($stmt, "siiss", $user_id, $id_tablejson,$table_id,$authority, $note);

                if (mysqli_stmt_execute($stmt)) {
                    http_response_code(201);
                    echo json_encode(["message" => "Thêm thành công"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Thêm không thành công: " . mysqli_error($conn)]);
                }

                mysqli_stmt_close($stmt);
            }
        }
    }

?>
