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
        function getCommentForUserFirst($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getCommentForUserFirst($id);
            }
        }
        function getCommentForUserSecond($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getCommentForUserSecond($id);
            }
        }
        function getCommentForUserThird($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->getCommentForUserThird($id);
            }
        }
        function deletecommentfirst($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->deleteCommentFirst($id);
            }
        }
        function deletecommentsecond($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->deleteCommentSeCond($id);
            }
        }
        function deletecommentthird($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->deletecommentthird($id);
            }
        }
        function addComment($user_id='',$id_register='',$note=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->addComment($user_id,$id_register,$note, date('Y-m-d H:i:s'));
            }
        }
        function addCommentSeCond($user_id='',$id_register='',$note=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->addCommentSeCond($user_id,$id_register,$note, date('Y-m-d H:i:s'));
            }
        }
        function addCommentThird($user_id='',$id_register='',$note=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('ApplicationModel')->addCommentThird($user_id,$id_register,$note, date('Y-m-d H:i:s'));
            }
        }
    }
?>