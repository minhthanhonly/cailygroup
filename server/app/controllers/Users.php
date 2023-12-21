<?php
    class Users extends Controller{
        function index(){
            $dataUsers = $this->model('UsersModel')->getList();
            
            $this->data['users'] = $dataUsers;
            // Render view
            $this->render('users/index', $this->data);
        }

        function add($userid='', $password='', $realname='', $authority='', $user_group=''){
            return $this->model('UsersModel')->postAdd($userid, $password, $realname, $authority, $user_group);
        }

    }
?>