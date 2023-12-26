<?php
    class DayoffsModel{
        function getDayoffs(){
            global $conn;
            
            $groupFilter = isset($_GET['group']) ? mysqli_real_escape_string($conn, $_GET['group']) : 'all';

            $query = "SELECT dayoffs.*, 
                        CONCAT(dayoffs.time_start, ' - ' , dayoffs.date_start) AS start_datetime, 
                        CONCAT(dayoffs.time_end, ' - ', dayoffs.date_end) AS end_datetime, 
                        users.realname,
                        groups.group_name
                FROM dayoffs
                JOIN users ON dayoffs.user_id = users.id
                JOIN groups ON users.user_group = groups.id";

            if ($groupFilter !== 'all') {
                $query .= " WHERE groups.id = '$groupFilter'";
            }

            $allGroup = mysqli_query($conn, $query);

            if ($allGroup) {
                $data = [];

                while ($row = mysqli_fetch_assoc($allGroup)) {
                    $row['start_datetime'] = $row['start_datetime'];
                    $row['end_datetime'] = $row['end_datetime'];
                    $data[] = $row;
                }

                if (!empty($data)) {
                    http_response_code(200);
                    echo json_encode($data);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "No data found with the specified group"]);
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