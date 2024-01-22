<?php
    class Dashboard extends Controller{
        // function index(){
        //     return $this->model('UsersModel')->getList();
        // }

        function add($user_id='', $timecard_year='', $timecard_month='', $timecard_day='', $timecard_date='', $owner='', $timecard_temp=''){
            return $this->model('TimeModel')->postAdd($user_id, $timecard_year, $timecard_month, $timecard_day, $timecard_date, $owner, $timecard_temp);
        }
    }
?>