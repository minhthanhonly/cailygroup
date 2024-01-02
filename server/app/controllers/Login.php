<?php
    class Login extends Controller{
        function index($userid='', $password=''){
            $this->model('LoginModel')->Login($userid, $password);
        }
    }
?>