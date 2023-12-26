<?php
	class UsersModel{
		function getList(){
			global $conn;

			// Thực hiện truy vấn SELECT
			$sql = "SELECT users.*, groups.group_name FROM users INNER JOIN groups ON users.user_group = groups.id";
			$result = $conn->query($sql);

			// Kiểm tra và hiển thị kết quả
			if ($result->num_rows > 0) {
				// Duyệt qua từng dòng dữ liệu
				while ($row = $result->fetch_assoc()) {
					$data[] = $row;
				}
			} else {
				echo "Không có dữ liệu";
			}

			header('Content-Type: application/json');
			echo json_encode($data);
			return;

			// Đóng kết nối
			$conn->close();
		}

		function postAdd($userid, $password, $realname, $authority, $user_group){
			global $conn;
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {
				$userPostData = json_decode(file_get_contents("php://input"));

				// Lấy dữ liệu từ phần thân của yêu cầu
				$userid = $userPostData->userid;
				$password = $userPostData->password;
				$realname = $userPostData->realname;
				$authority = $userPostData->authority;
				$user_group = $userPostData->user_group;
			
				// Thêm dữ liệu vào cơ sở dữ liệu
				$sql = "INSERT INTO users (id, userid, password, password_default, realname, authority, user_group, user_groupname, user_email, user_skype, user_ruby, user_postcode,user_address, user_addressruby, user_phone, user_mobile, user_order, edit_level, edit_group, edit_user, owner, editor, createdAt, updatedAt) VALUES ('', '$userid', '$password', '', '$realname', '$authority', '$user_group', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')";
				$result = $conn->query($sql);

				header('Content-Type: application/json');
				if($result) {
					echo json_encode(['success' => 'Thêm thành viên mới thành công']);
					return;
				} else {
					echo json_encode(['success' => 'Please check the Users data!']);
					return;
				}
				
			}
		}
	}

?>