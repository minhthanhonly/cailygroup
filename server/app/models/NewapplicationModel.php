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
				$createdAt = date('Y-m-d H:i:s');
			
				// Thêm dữ liệu vào cơ sở dữ liệu
				$sql = "INSERT INTO application_details (datajson, owner, id_status, createdAt) 
				VALUES ('$appJsonString', 'Admin', 1, NOW())";

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