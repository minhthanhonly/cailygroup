<?php
    class Form extends Controller{
        function __construct(){
            $getAuthHeader = Controller::getAuthorizationHeader();
            $getBearerToken = Controller::getBearerToken($getAuthHeader);
            return $getBearerToken;
        }

        function add($form_name='', $formDescription='', $reactFormData='', $status='', $owner=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('FormModel')->postAdd($form_name, $formDescription, $reactFormData, $status, $owner);
            }
        }

        function detail($id=''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('FormModel')->getDetail($id);
            }
        }

        // function edit($id=''){
        //     $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
        //     if($is_jwt_valid == 1){
        //         return $this->model('UsersModel')->getEdit($id);
        //     }
        // }

        // function update($id='', $userid='', $password='', $passwordNew='', $realname='', $authority='', $user_group=''){
        //     $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
        //     if($is_jwt_valid == 1){
        //         return $this->model('UsersModel')->postUpdate($id, $userid, $password, $passwordNew, $realname, $authority, $user_group);
        //     }
        // }

        // function delete($id=''){
        //     $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
        //     if($is_jwt_valid == 1){
        //         return $this->model('UsersModel')->delete($id);
        //     }
        // }

        // function groups($id=''){
        //     $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
        //     if($is_jwt_valid == 1){
        //         return $this->model('UsersModel')->getMembersByGroup($id);
        //     }
        // }
    }
?>