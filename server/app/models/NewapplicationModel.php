<?php
	class NewapplicationModel extends Model{
		function getList(){
			global $conn;

			// Thực hiện truy vấn SELECT
			$sql = "SELECT * FROM forms";
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
			$sql = "SELECT * FROM forms WHERE id='$id'";

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

		function postAdd($appJsonString){
			global $conn;
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {


				$appJsonString = file_get_contents("php://input");
				$appPostData = json_decode(file_get_contents("php://input"));

				$userNameReg = $appPostData->userNameReg;
			
				//Thêm dữ liệu vào cơ sở dữ liệu
				$sql = "INSERT INTO application_details (datajson, owner, id_status, createdAt, updatedAt) 
				VALUES ('$appJsonString', '$userNameReg', 1, NOW(), NOW())";

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
		}

		function postUpload(){
			global $conn;
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {

				if(isset($_FILES['pfile']))
				{
					// Nếu file upload không bị lỗi,
					// Tức là thuộc tính error > 0
					if ($_FILES['pfile']['error'] > 0)
					{
						echo 'File Upload Bị Lỗi';
					}
					else{
						// Upload file
						move_uploaded_file($_FILES['pfile']['tmp_name'], './upload/'.$_FILES['pfile']['name']);
						echo 'File Uploaded';
						// echo $_SERVER['HTTP_HOST'].'/caily/upload/'.$_FILES['pfile']['name'];
					}
				}
				else{
					echo 'Bạn chưa chọn file upload';
				}
			}
		}

		function delete(){
			global $conn;
			$formPostData = json_decode(file_get_contents("php://input"));

			// Lấy dữ liệu từ phần thân của yêu cầu
			$id = $formPostData->id;

			// Thực hiện truy vấn SELECT
			$sql = "DELETE FROM forms WHERE id='$id'";
			$result = $conn->query($sql);

			header('Content-Type: application/json');
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
	}
?>