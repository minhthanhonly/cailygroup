<?php
	class FormModel extends Model{
		function postAdd($form_name, $formDescription, $reactFormData, $status, $owner){
			global $conn;
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {
				$formPostData = json_decode(file_get_contents("php://input"));

				// Lấy dữ liệu từ phần thân của yêu cầu
				$form_name = $formPostData->form_name;
				$form_description = $formPostData->formDescription;
                $form = file_get_contents("php://input");
				$status = $formPostData->status;
				$owner = $formPostData->owner;
			
				// Thêm dữ liệu vào cơ sở dữ liệu
				$sql = "INSERT INTO forms (form_name, form_description, form, status, owner) 
				VALUES ('$form_name', '$form_description', '$form', '$status', '$owner')";
				
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

        function getDetail($id){
			global $conn;

			// Thực hiện truy vấn SELECT
			$sql = "SELECT form FROM forms WHERE id='9'";

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
	}

?>