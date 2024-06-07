<?php
	class UsersModel extends Model{
		function getList(){
			global $conn;

			// Thực hiện truy vấn SELECT
			$sql = "SELECT users.*, groups.group_name, authority.authority_name FROM users 
			JOIN groups ON users.user_group = groups.id
			JOIN authority ON users.authority = authority.id";
			$result = $conn->query($sql);

			// Kiểm tra và hiển thị kết quả
			if ($result->num_rows > 0) {
				// Duyệt qua từng dòng dữ liệu
				while ($row = $result->fetch_assoc()) {
					$data[] = $row;
				}
			} else {
				$data = [];
			}
			
			header('Content-Type: application/json');
			echo json_encode($data);
			return;

			// Đóng kết nối
			$conn->close();
		}

		function getDetail($id){
			global $conn;

			// Thực hiện truy vấn SELECT
			$sql = "SELECT u.*, g.group_name, a.authority_name
			FROM users AS u
			JOIN groups AS g ON u.user_group = g.id
			JOIN authority AS a ON u.authority = a.id
			WHERE u.id='$id'";

			$result = $conn->query($sql);

			// Kiểm tra và hiển thị kết quả
			if ($result->num_rows > 0) {
				// Duyệt qua từng dòng dữ liệu
				while ($row = $result->fetch_assoc()) {
					$data = $row;
				}
			}

			echo json_encode($data);
			return;

			// Đóng kết nối
			$conn->close();
		}

		function postAdd($userid, $password, $realname, $authority, $user_group, $user_email){
			global $conn;
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {
				$userPostData = json_decode(file_get_contents("php://input"));

				// Lấy dữ liệu từ phần thân của yêu cầu
				$userid = $userPostData->userid;
				$password = password_hash($userPostData->password, PASSWORD_BCRYPT);
				$realname = $userPostData->realname;
				$authority = $userPostData->authority;
				$user_group = $userPostData->user_group;
				$user_email = $userPostData->user_email;
			
				// Thêm dữ liệu vào cơ sở dữ liệu
				$sql = "INSERT INTO users (userid, password, password_default, realname, authority, user_group, user_groupname, user_email, user_skype, user_ruby, user_postcode,user_address, user_addressruby, user_phone, user_mobile, user_order, edit_level, edit_group, edit_user, owner, editor, createdAt, updatedAt) 
				VALUES ('$userid', '$password', '', '$realname', '$authority', '$user_group', '', '$user_email', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')";
				
				$result = $conn->query($sql);

				if($result) {
					echo json_encode(['success' => 'Thêm thành viên mới thành công']);
					return;
				} else {
					echo json_encode(['success' => 'Please check the Users data!']);
					return;
				}
				
			}
		}

		function getEdit($id){
			global $conn;

			// Thực hiện truy vấn SELECT
			$sql = "SELECT * FROM users WHERE id='$id'";
			$result = $conn->query($sql);

			// Kiểm tra và hiển thị kết quả
			while ($row = $result->fetch_assoc()) {
				$data = $row;
			}

			header('Content-Type: application/json');
			echo json_encode($data);
			return;

			// Đóng kết nối
			$conn->close();
		}

		function postUpdate($userid, $password, $passwordNew, $realname, $authority, $user_group, $user_email){
			global $conn;
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {
				$userPostData = json_decode(file_get_contents("php://input"));

				// Lấy dữ liệu từ phần thân của yêu cầu
				$id = $userPostData->id;
				$userid = $userPostData->userid;
				$password = $userPostData->password;
				$passwordNew = $userPostData->passwordNew;

				if(!empty($userPostData->passwordNew)) {
					$passwordNew = password_hash($userPostData->passwordNew, PASSWORD_BCRYPT);
				}
				$realname = $userPostData->realname;
				$authority = $userPostData->authority;
				$user_group = $userPostData->user_group;
				$user_email = $userPostData->user_email;
				
				//Cập nhật dữ liệu vào cơ sở dữ liệu
				if(!empty($passwordNew)) {
					$sql = "UPDATE users SET userid='$userid', password='$passwordNew', password_default='', realname='$realname', authority='$authority', user_group='$user_group', user_groupname='', user_email='$user_email', user_skype='', user_ruby='', user_postcode='',user_address='', user_addressruby='', user_phone='', user_mobile='', user_order='', edit_level='', edit_group='', edit_user='', owner='', editor='', createdAt='', updatedAt='' WHERE id='$id'";
				} else {
					$sql = "UPDATE users SET userid='$userid', password='$password', password_default='', realname='$realname', authority='$authority', user_group='$user_group', user_groupname='', user_email='$user_email', user_skype='', user_ruby='', user_postcode='',user_address='', user_addressruby='', user_phone='', user_mobile='', user_order='', edit_level='', edit_group='', edit_user='', owner='', editor='', createdAt='', updatedAt='' WHERE id='$id'";
				}

				$result = $conn->query($sql);

				if($result) {
					echo json_encode(['success' => 'Cập nhật thành viên thành công']);
					return;
				} else {
					echo json_encode(['success' => 'Please check the Users data!']);
					return;
				}
			}
		}

		function delete($id){
			global $conn;
			$userPostData = json_decode(file_get_contents("php://input"));

			// Lấy dữ liệu từ phần thân của yêu cầu
			$id = $userPostData->id;

			// Thực hiện truy vấn SELECT
			$sql = "DELETE FROM users WHERE id='$id'";

			$result = $conn->query($sql);

			if($result) {
				$result = "ok";
				echo json_encode(['success' => $result]);
				return;
			} else {
				$result = "error";
				echo json_encode(['success' => $result]);
				return;
			}
		}

		function getMembersByGroup($id){
			global $conn;

			// Thực hiện truy vấn SELECT
			if($id === '-1') {
				$sql = "SELECT users.*, groups.group_name, authority.authority_name FROM users 
				JOIN groups ON users.user_group = groups.id
				JOIN authority ON users.authority = authority.id";
			} else {
				$sql = "SELECT users.*, groups.group_name, authority.authority_name FROM users 
				JOIN groups ON users.user_group = groups.id
				JOIN authority ON users.authority = authority.id
				WHERE user_group='$id'";
			}
			
			$result = $conn->query($sql);

			// Kiểm tra và hiển thị kết quả
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$data[] = $row;
				}
			} else {
				$data = [];
			}

			header('Content-Type: application/json');
			echo json_encode($data);
			return;

			// Đóng kết nối
			$conn->close();
		}

		function getMembersByAuthority(){
			global $conn;
			$idManager = 2;
			$idLeader = 3;

			// Thực hiện truy vấn SELECT
			$sql = "SELECT u.id, u.realname, a.authority_name
			FROM users AS u
			JOIN authority AS a ON u.authority = a.id
			WHERE u.authority='$idManager' OR u.authority='$idLeader'";
			
			$result = $conn->query($sql);

			// Kiểm tra và hiển thị kết quả
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$data[] = $row;
				}
			} else {
				$data = [];
			}

			header('Content-Type: application/json');
			echo json_encode($data);
			return;

			// Đóng kết nối
			$conn->close();
		}
	}

?>