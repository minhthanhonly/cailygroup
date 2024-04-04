<?php
    class Application extends Controller{
        function __construct(){
            $getAuthHeader = Controller::getAuthorizationHeader();
            $getBearerToken = Controller::getBearerToken($getAuthHeader);
            return $getBearerToken;
        }
        function index(){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getApplication();
            }
        }
        function getforid($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getApplicationForId($id);
            }
        }
        function getcomment($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getComment($id);
            }
        }
        function deletecomment($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->deleteComment($id);
            }
        }
        function addComment($user_id='',$id_register='',$note=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->addComment($user_id,$id_register,$note, date('Y-m-d H:i:s'));
            }
        }
    }
?>