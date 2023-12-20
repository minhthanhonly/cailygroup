<?php
    class UsersModel{
        function getList(){
            global $db_conn;
            $getList = mysqli_query($db_conn, "SELECT * FROM users");
            if(mysqli_num_rows($getList) > 0) {
                while($row = mysqli_fetch_array($getList)) {
                    $json_array["data"][] = array(
                        "realname" => $row['realname'], 
                        "user_group" => $row['user_group'],
                        "user_email" => $row['user_email'],
                        "user_skype" => $row['user_skype'],
                        "user_phone" => $row['user_phone']
                    );
                }
               
               
                echo json_encode($json_array["data"]);
                return;
            } else {
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }
        }

        function getDetail($id){
            $data =  [
                'PHP',
                'REACTJS',
                'PUGJS'
            ];
            return $data[$id];
        }
    }

?>