<?php
    class Groups extends Controller{
        function index(){
            $dataGroups = $this->model('GroupsModel')->getGroups();
        }
        function add($group_name = '', $add_level = '', $owner = ''){
            {
                return $this->model('GroupsModel')->addGroups($group_name, $add_level, $owner, date('Y-m-d H:i:s'));
            }
        }
        function update($id = '', $group_name = '') {
            return $this->model('GroupsModel')->updateGroups($id, $group_name);
        }
        function delete($id=''){
            return $this->model('GroupsModel')->deleteGroups($id);
        }
    }  
?>