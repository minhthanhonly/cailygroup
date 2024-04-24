<?php
    class Newapplication extends Controller{
        // function __construct(){
        //     $getAuthHeader = Controller::getAuthorizationHeader();
        //     $getBearerToken = Controller::getBearerToken($getAuthHeader);
        //     return $getBearerToken;
        // }
        
        // function index(){
        //     $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
        //     if($is_jwt_valid == 1){
        //         return $this->model('FormModel')->getList();
        //     }
        // }

        function index(){
            return $this->model('NewapplicationModel')->getList();
        }

        function detail($id=''){
            return $this->model('NewapplicationModel')->getDetail($id);
        }
    }
?>