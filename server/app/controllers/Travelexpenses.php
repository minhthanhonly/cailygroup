<?php
    class Travelexpenses extends Controller{
        function __construct(){
            $getAuthHeader = Controller::getAuthorizationHeader();
            $getBearerToken = Controller::getBearerToken($getAuthHeader);
            return $getBearerToken;
        }
        function add($id ='', $tablejson = '', $owner = '', $table_id ='', $status = ''){
            $is_jwt_valid = Controller::is_jwt_valid($this->__construct());
            if($is_jwt_valid == 1){
                return $this->model('TravelexpensesModel')->postadd($id , $tablejson, $owner, $table_id, $status);
            }
        }
       
       
       
   }  
?>