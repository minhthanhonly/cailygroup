<?php

class TravelexpensesModel {
    function getadd($id, $tablejson, $owner, $table_id, $status) {
        global $conn;
        if (!$conn) {
            die("Kết nối không thành công: " . mysqli_connect_error());
        }
       
        // Kiểm tra phương thức yêu cầu
            // Đọc dữ liệu JSON từ yêu cầu POST
            $json_data = file_get_contents("php://input");
            $tablejson = $json_data;
            
            $decode = json_decode($json_data);
             $table_id =  $decode->table_id;
             $status = $decode -> $status;
           //   $table_id = $json_data['requestData']['table_id'];


          //  $status = $json_data['requestData']['status'];
          //  var_dump($tablejson);
            // Chuẩn bị câu lệnh SQL chèn dữ liệu với tham số ràng buộc
            $insertQuery = "INSERT INTO table_json (tablejson, owner, table_id, status) VALUES ('$tablejson', 'admin','$table_id', '$status')";
            $result = $conn->query($insertQuery);
 
            if($result) {
                echo json_encode(['success' => 'Thêm thành viên mới thành công']);
                return;
            } else {
                echo json_encode(['success' => 'Please check the Users data!']);
                return;
            }
        
    }
}
?> 