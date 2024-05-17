<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    class ApplicationModel{

        function getApplication(){
            global $conn;
            $statusFilter = isset($_GET['id_status']) ? mysqli_real_escape_string($conn, $_GET['id_status']) : '-1';
            $sql = "SELECT * FROM application_details";
            if ($statusFilter != -1) {
                $sql .= " WHERE id_status = $statusFilter"; // Sửa từ $query thành $sql
            }
            $sql .= " ORDER BY id DESC"; 
            $result = $conn->query($sql);
            $data = array();
            if ($result->num_rows > 0) {
               while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
            }
            // Trả về dữ liệu dưới dạng JSON
            header('Content-Type: application/json');
            echo json_encode($data);
            return;
            $conn->close();
        }

        function getAllStatus(){
            global $conn;
            $sql = "SELECT * FROM status";
           // echo $sql; // In ra câu truy vấn để kiểm tra
            $result = $conn->query($sql);
            $data = array();
            if ($result->num_rows > 0) {
               while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
            }
            // Trả về dữ liệu dưới dạng JSON
            header('Content-Type: application/json');
            echo json_encode($data);
            return;
            $conn->close();
        }

        function getApplicationByIdStatus($idStatus){
            global $conn;
            $statusFilter = isset($_GET['id_status']) ? mysqli_real_escape_string($conn, $_GET['id_status']) : '-1';
            $sql = "SELECT * FROM application_details WHERE id_status = '$idStatus'";
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
                    FROM application_details 
                    WHERE application_details.id = $id";
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
                header('Content-Type: application/json'); // Di chuyển câu lệnh này lên đầu
                $groupUpdateData = json_decode(file_get_contents("php://input"), true);
                if (isset($groupUpdateData['id'], $groupUpdateData['id_status'])) {
                    $id = mysqli_real_escape_string($conn, $groupUpdateData['id']);
                    $id_status = mysqli_real_escape_string($conn, $groupUpdateData['id_status']);
                    mysqli_query($conn, "SET time_zone = '+07:00'");
                    // Lấy dữ liệu JSON từ cột tablejson
                    $selectQuery = "SELECT JSON_EXTRACT(datajson, '$.id_status') AS id_status FROM application_details WHERE id = '$id'";
                    $results = mysqli_query($conn, $selectQuery);
                    $row = mysqli_fetch_assoc($results);
                    $current_json = json_decode($row['id_status'], true);
                    if (isset($current_json)) {
                        $current_json = $id_status;
                        $new_json = json_encode($current_json);
                        $updateQuery = "UPDATE application_details SET datajson = JSON_SET(datajson, '$.id_status', $new_json), id_status = '$id_status', updatedAt = NOW() WHERE id ='$id'";
                
                        if (mysqli_query($conn, $updateQuery)) {
                            $responseData = ["message" => "Dữ liệu được cập nhật thành công"];
                        } else {
                            http_response_code(500);
                            $responseData = ["error" => "Không thể cập nhật dữ liệu"];
                        }
                        
                        $sqlSelect = "SELECT * FROM application_details WHERE id = '$id'";
                        $result = $conn->query($sqlSelect);
                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                $data = $row;
                            }
                        } else {
                            $result = "error";
                            $data = [];
                        }
                    } else {
                        http_response_code(400);
                        $responseData = ["error" => "Dữ liệu không hợp lệ"];
                    }
                
                    echo json_encode(['success' => $responseData, 'info' => $data]);
                    return;
                
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
                }
                $conn->close();
            }
        }

        function getCommentForUserFirst($id){
            global $conn;
            $selectQuery = "SELECT comment.*,
                        users.realname,
                        authority.authority_name,
                        comment.createdAt AS createdAt
                    FROM comment
                    JOIN users ON comment.user_id = users.id
                    JOIN application_details ON application_details.id = comment.aplication_id
                    JOIN authority ON comment.authority_id = authority.id
                    WHERE comment.aplication_id  = $id and comment.authority_id = 1";
            $result = mysqli_query($conn, $selectQuery);
                $data = [];
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data);
            $conn->close();
        }
        function addComment($user_id,$aplication_id,$authority_id, $note, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $commentPostData = json_decode(file_get_contents("php://input"));
                $user_id = $commentPostData->user_id;
                $aplication_id = $commentPostData->aplication_id;
                $authority_id = $commentPostData->authority_id;
                $note = trim($commentPostData->note); // Loại bỏ các khoảng trắng dư thừa
                if (empty($note)) {
                    http_response_code(400);
                    echo json_encode(["error" => "Không thể thêm comment: Nội dung trống"]);
                    exit();
                }
                $insertQuery = "INSERT INTO comment (user_id,aplication_id,authority_id, note, createdAt) 
                            VALUES (?, ?, ?,?,NOW())";
                $stmt = mysqli_prepare($conn, $insertQuery);

                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }
                mysqli_stmt_bind_param($stmt, "siis", $user_id, $aplication_id,$authority_id, $note);

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
                    JOIN application_details ON application_details.id = comment.aplication_id
                    JOIN authority ON comment.authority_id = authority.id
                    WHERE comment.aplication_id  = $id and comment.authority_id = 2";
            $result = mysqli_query($conn, $selectQuery);
                $data = [];

                while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data);
            $conn->close();
        }
        function addCommentSeCond($user_id,$aplication_id,$authority_id, $note, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $commentPostData = json_decode(file_get_contents("php://input"));
                $user_id = $commentPostData->user_id;
                $aplication_id = $commentPostData->aplication_id;
                $authority_id = $commentPostData->authority_id;
                $note = trim($commentPostData->note); // Loại bỏ các khoảng trắng dư thừa
                if (empty($note)) {
                    http_response_code(400);
                    echo json_encode(["error" => "Không thể thêm comment: Nội dung trống"]);
                    exit();
                }
                $insertQuery = "INSERT INTO comment (user_id,aplication_id,authority_id, note, createdAt) 
                            VALUES (?, ?, ?,?,NOW())";
                $stmt = mysqli_prepare($conn, $insertQuery);
                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }
                mysqli_stmt_bind_param($stmt, "siis", $user_id, $aplication_id,$authority_id, $note);
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
                    JOIN application_details ON application_details.id = comment.aplication_id
                    JOIN authority ON comment.authority_id = authority.id
                    WHERE comment.aplication_id  = $id and comment.authority_id = 3";
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

        function deleteAccodion($id){
            global $conn;
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($id)) {
                $deleteQuery = "DELETE FROM application_details WHERE id = $id";
                // echo $deleteQuery;
                // exit();
                if (mysqli_query($conn, $deleteQuery)) {
                    http_response_code(200);
                echo json_encode(['errCode' => 0]);
                } else {
                    http_response_code(500);
                echo json_encode(['errCode' => 1, 'message' => 'không thể Xóa']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['errCode' => 2, 'message' => 'không thể tìm thấy']);
            }
            $conn->close();
        }
        
        function addCommentThird($user_id,$aplication_id,$authority_id, $note, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $commentPostData = json_decode(file_get_contents("php://input"));
                $user_id = $commentPostData->user_id;
                $aplication_id = $commentPostData->aplication_id;
                $authority_id = $commentPostData->authority_id;
                $note = trim($commentPostData->note); // Loại bỏ các khoảng trắng dư thừa
                if (empty($note)) {
                    http_response_code(400);
                    echo json_encode(["error" => "Không thể thêm comment: Nội dung trống"]);
                    exit();
                }
                $insertQuery = "INSERT INTO comment (user_id,aplication_id,authority_id, note, createdAt) 
                            VALUES (?, ?, ?,?,NOW())";
                $stmt = mysqli_prepare($conn, $insertQuery);
                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }
                mysqli_stmt_bind_param($stmt, "siis", $user_id, $aplication_id,$authority_id, $note);
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

        function postMail(){
			global $conn;
			if ($_SERVER["REQUEST_METHOD"] === "POST") {
				$mailData = json_decode(file_get_contents("php://input"));

                // -------------------------- Value Form --------------------------
                $appName = $mailData->appName;
                $nameStatus = $mailData->nameStatus;
                $userName = $mailData->userName;
                $userEmail = $mailData->userEmail;

                // -------------------------- Mail Content --------------------------
                $content = '';
                $content .= "<div class='box_email--content'>";
                $content .= "<p>件名：申請差し戻し：".$appName."</p>";
                $content .= "<p>株式会社GUIS <br>".$userName."（".$userEmail."）</p>";
                $content .= "<p>申請が差し戻しされました。<br>内容を確認し、再申請もしくは申請取り消しをしてください。</p>";
                $content .= "<p>----------------------------------------------------------------------</p>";
                $content .= "<p>申請者: ".$userName."</p><p>状態: ".$nameStatus."</p><p>申請の種類: ".$appName."</p>";
                $content .= "<p>----------------------------------------------------------------------</p>";
                $content .= "<p>以下のURLにアクセスして詳細を確認してください。</p><p>http://〇〇〇〇〇</p>";
                $content .= "<p class='box_email--note'># 本メールはシステムより自動送信されています。<br># 本メールに返信されましても、返答できませんのでご了承ください。</p></div>";

                try{
                    //Server settings
                    $mail = new PHPMailer(true);
                    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                    $mail->isSMTP();                                            //Send using SMTP
                    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                    $mail->Username   = 'tu.caily.com.vn@gmail.com';                     //SMTP username
                    $mail->Password   = 'rnxztvdgxsoizaze';                               //SMTP password
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
                
                    //Recipients
                    $mail->setFrom('caily-noreply@caily.com.vn', 'CAILY GROUP');   // Email và tên người gửi
                    $mail->addAddress($userEmail, $userName);     //Add a recipient
                    $mail->addReplyTo('noreply@caily.com.vn', 'Noreply');
                
                    //Content
                    $mail->CharSet = "UTF-8";
                    $mail->isHTML(true);                                  //Set email format to HTML
                    $mail->Subject = 'Email Response To Your Application!';
                    $mail->Body    = $content;
                    $mail->AltBody = '';
                
                    /* Send Mail */ 	
                    $mail->send();
                    $host  = $_SERVER['HTTP_HOST'];
                    // header("Location: http://$host/contact/complete.html");
                } catch (Exception $e) {
                    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                }
			}
		}
    }
?>
