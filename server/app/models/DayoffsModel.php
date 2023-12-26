<?php
    class DayoffsModel{
        function getList(){
            global $conn;
            
            $query = "SELECT dayoffs.*, 
                CONCAT(dayoffs.time_start, ' - ' , dayoffs.date_start) AS start_datetime, 
                CONCAT(dayoffs.time_end, ' - ', dayoffs.date_end) AS end_datetime, 
                users.realname 
            FROM dayoffs
            JOIN users ON dayoffs.user_id = users.id";
            $allGroup = mysqli_query($conn, $query);

            if ($allGroup) {
                $data = [];

                while ($row = mysqli_fetch_assoc($allGroup)) {
                    // Thêm dữ liệu mới vào mảng
                    $row['start_datetime'] = $row['start_datetime'];
                    $row['end_datetime'] = $row['end_datetime'];
                    $data[] = $row;
                }

                if (!empty($data)) {
                    http_response_code(200);
                    echo json_encode($data);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "No data found"]);
                }
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Internal Server Error"]);
            }
            $conn->close();
        }

        // function getDetail($id){
        //     $data =  [
        //         'PHP',
        //         'REACTJS',
        //         'PUGJS'
        //     ];
        //     return $data[$id];
        // }
    }

?>