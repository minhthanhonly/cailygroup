<?php
    class Groups extends Controller{
        function index(){
            $dataGroups = $this->model('GroupsModel')->getGroups();
        }
        function add($group_name = '', $add_level = '', $owner = '')
            {
                return $this->model('GroupsModel')->addGroups($group_name, $add_level, $owner, date('Y-m-d H:i:s'));
            }
        }
        function update(){
            return $this->model('GroupsModel')->updateGroups();
        }

?>