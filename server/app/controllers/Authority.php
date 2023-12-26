<?php
    class Authority extends Controller{
        function index(){
            $dataAuthority = $this->model('AuthorityModel')->getList();
        }
    }
?>