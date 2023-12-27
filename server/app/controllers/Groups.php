<?php
    class Groups extends Controller{
        function index(){
            $dataGroups = $this->model('GroupsModel')->getGroups();
        }
    }
?>