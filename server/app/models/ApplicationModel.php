<?php
    class ApplicationModel{
        function getApplication(){
            global $conn;
            $statusFilter = isset($_GET['status']) ? mysqli_real_escape_string($conn, $_GET['status']) : '-1';
            $query = "SELECT *  FROM register";
            if ($statusFilter != -1) {
                $query .= " WHERE status = $statusFilter";
            }
            $allRegister = mysqli_query($conn, $query);

            if ($allRegister) {
                $data = [];

                while ($row = mysqli_fetch_assoc($allRegister)) {
                    $data[] = $row;
                }
                http_response_code(200);
                echo json_encode($data,JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(500);
                echo json_encode(['errCode' => 1, 'message' => 'không thể tìm thấy status']);
            }
            $conn->close();
        }
        
        function getApplicationForId($id){
            global $conn;
            $query = "SELECT * FROM register WHERE id = $id";
            $result = $conn->query($query);
            $register = null;

            if ($result && $result->num_rows > 0) {
                $register = $result->fetch_assoc(); // Lấy ra đối tượng từ kết quả truy vấn
            }
            else {
                // Nếu không có dòng nào khớp với id, trả về một đối tượng trống
                $register = new stdClass();
            }

            echo json_encode($register); // Trả về đối tượng JSON
            $conn->close();
        }
    }

?>