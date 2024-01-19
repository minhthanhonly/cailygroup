<?php
    class Login extends Controller{
        function index($userid='', $password=''){
            return $this->model('LoginModel')->Login($userid, $password);
            // $this->render('login/index');
        }
    }
?>