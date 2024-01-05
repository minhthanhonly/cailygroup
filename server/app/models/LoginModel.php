<?php
	class LoginModel{
		function Login($userid, $password){
			global $conn;
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {
				$userPostData = json_decode(file_get_contents("php://input"));

				// Lấy dữ liệu từ phần thân của yêu cầu
				$userid = $userPostData->userid;
				$password = $userPostData->password;
			
                $sql = "SELECT * FROM users WHERE userid='$userid'";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    // Duyệt qua từng dòng dữ liệu
                    while ($row = $result->fetch_assoc()) {
                        $data = $row;
                    }
                    if($password != $data['password']) {
                        $result = "Mật khẩu không hợp lệ";
                    } else {
                        $result = "Đăng nhập thành công! chuyển hướng...";
                    }
                } else {
                    $result = "Tên đăng nhập không hợp lệ";
                }
                
				header('Content-Type: application/json');
				echo json_encode(['success' => $result]);
				return;
			}
		}
	}

?>