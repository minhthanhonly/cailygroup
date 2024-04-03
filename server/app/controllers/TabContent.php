<?php
    class Tabcontent extends Controller{
        // function __construct(){
        //     $getAuthHeader = Controller::getAuthorizationHeader();
        //     $getBearerToken = Controller::getBearerToken($getAuthHeader);
        //     return $getBearerToken;
        // }
        // function index(){
        //     $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
        //     if($is_jwt_valid == 1){
        //         return $this->model('Tab1ContentModel')->getTab1Content();
        //     }
        // }
        // function index(){
        //     return $this->model('TabContentModel')->getTabContent();
        // }
        // function index(){
        //         return $this->model('TabContentModel')->getAplication();
        // }
        function index(){
            return $this->model('TabContentModel')->getComment();
        }
    }
?>