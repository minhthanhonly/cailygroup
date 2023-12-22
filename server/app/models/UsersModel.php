<?php
    class UsersModel{
        private $conn;

        function getList(){
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
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                // Lấy dữ liệu từ phần thân của yêu cầu
                $userid = $_POST["userid"];
                $password = $_POST["password"];
                $realname = $_POST["realname"];
                $authority = $_POST["authority"];
                $user_group = $_POST["user_group"];
            
                // Thêm dữ liệu vào cơ sở dữ liệu
                $sql = "INSERT INTO users (userid, password, realname, authority, user_group) VALUES ('$userid', '$password', '$realname', '$authority', '$user_group')";
                $result = $conn->query($sql);
                if ($resul === TRUE) {
                    return true;
                } else {
                    return false;
                }
               
                // Trả về kết quả
                header('Content-Type: application/json');
                echo json_encode(['success' => 'success']);
                return;

                // Đóng kết nối
                $conn->close();
            }
        }
    }

?>