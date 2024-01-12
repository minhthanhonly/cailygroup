<?php
    class Users extends Controller{
        function index(){
            return $this->model('UsersModel')->getList();
        }

        function detail($id=''){
            return $this->model('UsersModel')->getDetail($id);
        }

        function add($userid='', $password='', $realname='', $authority='', $user_group=''){
            return $this->model('UsersModel')->postAdd($userid, $password, $realname, $authority, $user_group);
        }

        function edit($id=''){
            return $this->model('UsersModel')->getEdit($id);
        }

        function update($id='', $userid='', $password='', $passwordNew='', $realname='', $authority='', $user_group=''){
            return $this->model('UsersModel')->postUpdate($id, $userid, $password, $passwordNew, $realname, $authority, $user_group);
        }

        function delete($id=''){
            return $this->model('UsersModel')->delete($id);
        }

        function groups($id=''){
            return $this->model('UsersModel')->getMembersByGroup($id);
        }
    }
?>