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
        function edit($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getEdit($id);
            }
        }
        function getApplicationByIdStatus($idStatus=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getApplicationByIdStatus($idStatus);
            }
        }
        function getforid($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getApplicationForId($id);
            }
        }
        function getComment($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getComment($id);
            }
        }
        function addComment($user_id='',$aplication_id='',$authority_id='', $note=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->addComment($user_id,$aplication_id,$authority_id, $note, date('Y-m-d H:i:s'));
            }
        }
        function deleteComment($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->deleteComment($id);
            }
        }
        function deleteaccodion($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->deleteaccodion($id);
            }
        }
        function updateStatus($id = '',$id_status='') {
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->updateStatus($id,$id_status,date('Y-m-d H:i:s'));
            }
        }
        function getAllStatus(){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getAllStatus();
            }
        }
        function mail(){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->postMail();
            }
        }
        function getUsers($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getUsers($id);
            }
        }
        function getApplicationOther($userId=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getApplicationOther($userId);
            }
        }
    }
?>