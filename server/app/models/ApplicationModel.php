<?php
    class ApplicationModel{

        // function getApplication(){
        //     global $conn;
        //     $statusFilter = isset($_GET['id_status']) ? mysqli_real_escape_string($conn, $_GET['id_status']) : '-1';
        //     $query = "SELECT *  FROM register";
        //     if ($statusFilter != -1) {
        //         $query .= " WHERE id_status = $statusFilter";
        //     }
        //     $allRegister = mysqli_query($conn, $query);

        //     if ($allRegister) {
        //         $data = [];

        //         while ($row = mysqli_fetch_assoc($allRegister)) {
        //             $data[] = $row;
        //         }
        //         http_response_code(200);
        //         echo json_encode($data,JSON_UNESCAPED_UNICODE);
        //     } else {
        //         http_response_code(500);
        //         echo json_encode(['errCode' => 1, 'message' => 'không thể tìm thấy id_status']);
        //     }
        //     $conn->close();
        // }

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
        
        // function getApplicationForId($id){
        //     global $conn;
        //     $query = "SELECT * FROM register WHERE id = $id";
        //     $result = $conn->query($query);
        //     $register = null;

        //     if ($result && $result->num_rows > 0) {
        //         $register = $result->fetch_assoc(); // Lấy ra đối tượng từ kết quả truy vấn
        //     }
        //     else {
        //         // Nếu không có dòng nào khớp với id, trả về một đối tượng trống
        //         $register = new stdClass();
        //     }

        //     echo json_encode($register); // Trả về đối tượng JSON
        //     $conn->close();
        // }

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

        function getComment($id){
            global $conn;
            $query = "SELECT comment.*,
                        users.realname,
                        comment.createdAt AS createdAt
                    FROM comment
                    JOIN users ON comment.user_id = users.id
                    JOIN register ON register.id = comment.id_register
                    WHERE comment.id_register = $id";
            $allGroup = mysqli_query($conn, $query);
                $data = [];

                while ($row = mysqli_fetch_assoc($allGroup)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data);
            $conn->close();
        }

        function getCommentForUserFirst($id){
            global $conn;
            $query = "SELECT comment.*,
                        users.realname,
                        authority.authority_name,
                        comment.createdAt AS createdAt
                    FROM comment
                    JOIN users ON comment.user_id = users.id
                    JOIN register ON register.id = comment.id_register
                    JOIN authority ON comment.authority = authority.id
                    WHERE comment.id_register = $id and comment.authority = 1";
            $allGroup = mysqli_query($conn, $query);
                $data = [];

                while ($row = mysqli_fetch_assoc($allGroup)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data);
            $conn->close();
        }
        function getCommentForUserSecond($id){
            global $conn;
            $query = "SELECT comment.*,
                        users.realname,
                        authority.authority_name,
                        comment.createdAt AS createdAt
                    FROM comment
                    JOIN users ON comment.user_id = users.id
                    JOIN register ON register.id = comment.id_register
                    JOIN authority ON comment.authority = authority.id
                    WHERE comment.id_register = $id and comment.authority = 2";
            $allGroup = mysqli_query($conn, $query);
                $data = [];

                while ($row = mysqli_fetch_assoc($allGroup)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data);
            $conn->close();
        }
        function getCommentForUserThird($id){
            global $conn;
            $query = "SELECT comment.*,
                        users.realname,
                        authority.authority_name,
                        comment.createdAt AS createdAt
                    FROM comment
                    JOIN users ON comment.user_id = users.id
                    JOIN register ON register.id = comment.id_register
                    JOIN authority ON comment.authority = authority.id
                    WHERE comment.id_register = $id  and comment.authority = 3";
            $allGroup = mysqli_query($conn, $query);
                $data = [];

                while ($row = mysqli_fetch_assoc($allGroup)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data);
            $conn->close();
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
        function addComment($user_id, $id_register,$authority , $note, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $commentPostData = json_decode(file_get_contents("php://input"));
                $user_id = $commentPostData->user_id;
                $id_register = $commentPostData->id_register;
                $authority = $commentPostData->authority;
                $note = trim($commentPostData->note); // Loại bỏ các khoảng trắng dư thừa
                if (empty($note)) {
                    http_response_code(400);
                    echo json_encode(["error" => "Không thể thêm comment: Nội dung trống"]);
                    exit();
                }
                $insertQuery = "INSERT INTO comment (user_id, id_register,authority, note, createdAt) 
                            VALUES (?, ?, ?, ?,NOW())";
                $stmt = mysqli_prepare($conn, $insertQuery);

                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }
                mysqli_stmt_bind_param($stmt, "siis", $user_id, $id_register,$authority, $note);

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
        function addCommentSeCond($user_id, $id_register,$authority , $note, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $commentPostData = json_decode(file_get_contents("php://input"));
                $user_id = $commentPostData->user_id;
                $id_register = $commentPostData->id_register;
                $authority = $commentPostData->authority;
                $note = trim($commentPostData->note); // Loại bỏ các khoảng trắng dư thừa
                if (empty($note)) {
                    http_response_code(400);
                    echo json_encode(["error" => "Không thể thêm comment: Nội dung trống"]);
                    exit();
                }
                $insertQuery = "INSERT INTO comment (user_id, id_register,authority, note, createdAt) 
                            VALUES (?, ?, ?, ?,NOW())";
                $stmt = mysqli_prepare($conn, $insertQuery);

                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }
                mysqli_stmt_bind_param($stmt, "siis", $user_id, $id_register,$authority, $note);

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
        function addCommentThird($user_id, $id_register,$authority , $note, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $commentPostData = json_decode(file_get_contents("php://input"));
                $user_id = $commentPostData->user_id;
                $id_register = $commentPostData->id_register;
                $authority = $commentPostData->authority;
                $note = trim($commentPostData->note); // Loại bỏ các khoảng trắng dư thừa
                if (empty($note)) {
                    http_response_code(400);
                    echo json_encode(["error" => "Không thể thêm comment: Nội dung trống"]);
                    exit();
                }
                $insertQuery = "INSERT INTO comment (user_id, id_register,authority, note, createdAt) 
                            VALUES (?, ?, ?, ?,NOW())";
                $stmt = mysqli_prepare($conn, $insertQuery);

                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }
                mysqli_stmt_bind_param($stmt, "siis", $user_id, $id_register,$authority, $note);

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
