<?php
    class Search extends Controller{
        function __construct(){
            $getAuthHeader = Controller::getAuthorizationHeader();
            $getBearerToken = Controller::getBearerToken($getAuthHeader);
            return $getBearerToken;
        }
        
        function index(){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('SearchModel')->getall();
            }
        }
        function data(){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('SearchModel')->getalldata();
            }
        }
    }
?>