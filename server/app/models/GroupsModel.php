<?php
    class GroupsModel{
        function getGroups(){
            global $conn;
            $allGroup = mysqli_query($conn, "SELECT * FROM groups");
            if(mysqli_num_rows($allGroup) > 0) {
                while($row = mysqli_fetch_array($allGroup)) {
                    $json_array["groupdata"][] = array("id" => $row['id'], "group_name" => $row['group_name']);
                }
                echo json_encode($json_array["groupdata"]);
                return;
            } else {
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }
            $conn->close();
        }
        function addGroups($group_name, $add_level, $owner, $createdAt)
        {
            global $conn;
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $groupPostData = json_decode(file_get_contents("php://input"));
                // Lấy dữ liệu từ phần thân của yêu cầu
                $group_name = $groupPostData->group_name;
                $add_level = $groupPostData->add_level;
                $owner     = $groupPostData->owner;
                $createdAt = date('Y-m-d H:i:s');
                $insertQuery = "INSERT INTO groups (group_name, add_level, owner, createdAt) 
                    VALUES (?, ?, ?, ?)";
                $stmt = mysqli_prepare($conn, $insertQuery);

                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode(["error" => "Lỗi khi chuẩn bị câu lệnh: " . mysqli_error($conn)]);
                    exit();
                }

                // Truyền giá trị thời gian hiện tại vào câu truy vấn
                mysqli_stmt_bind_param($stmt, "siss", $group_name, $add_level, $owner, $createdAt);

                if (mysqli_stmt_execute($stmt)) {
                    http_response_code(201);
                    echo json_encode(["message" => "Thêm thành công"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Thêm không thành công: " . mysqli_error($conn)]);
                }

                mysqli_stmt_close($stmt);
            }
        }

        function updateGroups(){
            echo 1;
            global $conn;
            
            // Kiểm tra phương thức HTTP
            // if ($_SERVER["REQUEST_METHOD"] === "PUT") {
            //     // Lấy dữ liệu JSON từ body của request
            //     $groupUpdateData = json_decode(file_get_contents("php://input"));
        
            //     // Kiểm tra xem dữ liệu JSON có chứa các trường 'id' và 'group_name' hay không
            //     if (isset($groupUpdateData['id'], $groupUpdateData['group_name'])) {
            //         // Chuẩn bị dữ liệu cho truy vấn
            //         $id = mysqli_real_escape_string($conn, $groupUpdateData['id']);
            //         echo $id;
            //         // $group_name = mysqli_real_escape_string($conn, $groupUpdateData['group_name']);
        
            //         // // Tạo truy vấn SQL để cập nhật dữ liệu
            //         // $updateQuery = "UPDATE groups SET group_name = '$group_name' WHERE id = '$id'"; 
                    
            //         // // Thực hiện truy vấn và kiểm tra kết quả
            //         // if (mysqli_query($conn, $updateQuery)) {
            //         //     // Trả về mã trạng thái 200 và thông báo JSON cho biết cập nhật thành công
            //         //     http_response_code(200);
            //         //     echo json_encode(["message" => "Dữ liệu được cập nhật thành công"]);
            //         // } else {
            //         //     // Trả về mã trạng thái 500 và thông báo JSON cho biết cập nhật thất bại
            //         //     http_response_code(500);
            //         //     echo json_encode(["error" => "Không thể cập nhật dữ liệu"]);
            //         // }
            //     } else {
            //         // Trả về mã trạng thái 400 và thông báo JSON cho biết dữ liệu không hợp lệ
            //         http_response_code(400);
            //         echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
            //     }
        
            //     // Đóng kết nối cơ sở dữ liệu
            //     $conn->close();
            // }
        }
    }

?>