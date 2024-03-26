<?php
    class ExpensereportModel{
        // function getlist(){
        //     global $conn;
        //     $allGroup = mysqli_query($conn, "SELECT * FROM configs");
        //     while ($row = mysqli_fetch_array($allGroup)) {
        //         $json_array["configdata"][] = $row;
        //     }
        //     echo json_encode($json_array["configdata"]);
        //     return;
        //     echo "heeeee";
        //     $conn->close();
        // }

         function add($group_name = '', $add_level = '', $owner = ''){
            // $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            // if($is_jwt_valid == 1){
                return $this->model('GroupsModel')->addGroups($group_name, $add_level, $owner, date('Y-m-d H:i:s'));
            //}
        }
    }
?>