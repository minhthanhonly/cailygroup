<?php
    class Users extends Controller{
        function index(){
            $dataUsers = $this->model('UsersModel')->getList();
            
            $this->data['users'] = $dataUsers;
            // Render view
            $this->render('users/index', $this->data);
        }

        // function detail($id=0){
        //     $home = $this->model('UsersModel');
        //     $this->data['info'] = $home->getDetail($id);
        //     $this->render('home/detail', $this->data);
            
        // }
    }
?>