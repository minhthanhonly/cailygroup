<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

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
			global $config;

			$adminEmail = $config['email_admin'];
			$adminName = $config['name_admin'];
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {
				$appJsonString = file_get_contents("php://input");
				$appPostData = json_decode(file_get_contents("php://input"));

				$appName = $appPostData->appName;
				$userNameReg = $appPostData->userNameReg;
				$userEmailReg = $appPostData->userEmailReg;
				$id_status =  $appPostData->id_status;
				$user_id =  $appPostData->user_id;

				// Send Mail
				if($id_status === 1){
					// -------------------------- Mail Content --------------------------
					$content = '';
					$content .= "<div class='box_email--content'>";
					$content .= "<p>件名：".$appName."</p>";
					$content .= "<p>株式会社GUIS <br>".$userNameReg."（".$userEmailReg."）</p>";

					$content .= "<p>新規申請書があります。</p>";
					$content .= "<p>----------------------------------------------------------------------</p>";
					$content .= "<p>申請者: ".$userNameReg."</p>";
					$content .= "<p>状態: 承認待ち</p>";
					$content .= "<p>申請の種類: ".$appName."</p>";
					$content .= "<p>----------------------------------------------------------------------</p>";

					$content .= "<p>以下のURLにアクセスして詳細を確認してください。</p><p>http://".$_SERVER['HTTP_HOST'].'/caily/'."</p>";
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
						$mail->setFrom('caily-noreply@caily.com.vn', 'CAILY GROUP - '.$appName);   // Email và tên người gửi
						$mail->addAddress($adminEmail, $adminName);     //Add a recipient
						$mail->addReplyTo('noreply@caily.com.vn', 'Noreply');

						//Content
						$mail->CharSet = "UTF-8";
						$mail->isHTML(true);                                  //Set email format to HTML
						$mail->Subject = $config['subject_admin'];
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

				// Thêm dữ liệu vào cơ sở dữ liệu
				$sql = "INSERT INTO application_details (datajson, owner, id_status, user_id, createdAt, updatedAt) 
				VALUES ('$appJsonString', '$userNameReg', '$id_status', '$user_id', NOW(), NOW())";

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

		function postUpdateDetail(){
			global $conn;
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {
				$appJsonString = file_get_contents("php://input");
				$appPostData = json_decode(file_get_contents("php://input"));

				$id = $appPostData->id;
				$appName = $appPostData->appName;
				$userNameReg = $appPostData->userNameReg;
				$id_status =  $appPostData->id_status;
				$user_id =  $appPostData->user_id;
				

				// Cập nhật dữ liệu vào cơ sở dữ liệu
				$sql = "UPDATE application_details SET datajson='$appJsonString', owner='$userNameReg', id_status='$id_status', user_id='$user_id', updatedAt=NOW() WHERE id='$id'";

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

		function postUpdate(){
			global $conn;
			
			if ($_SERVER["REQUEST_METHOD"] === "POST") {
				$appJsonString = file_get_contents("php://input");
				$appPostData = json_decode(file_get_contents("php://input"));

				// Lấy dữ liệu từ phần thân của yêu cầu
				$id = $appPostData->id;
				$form_name = $appPostData->form_name;
				$form_description = $appPostData->formDescription;
				$status = $appPostData->status;
				$owner = $appPostData->owner;
				
				//Cập nhật dữ liệu vào cơ sở dữ liệu
				$sql = "UPDATE forms SET form_name='$form_name', form_description='$form_description', form='$appJsonString', status='$status', owner='$owner' WHERE id='$id'";
				
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