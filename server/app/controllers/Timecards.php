<?php
    class Timecards extends Controller{
        function getall($id){
            return $this->model('TimecardsModel')->getTimecards($id);
        }
        function load($id){
            return $this->model('TimecardsModel')->getTimecardUser($id);
        }
        function add($user_id='', $timecard_year='', $timecard_month='', $timecard_day='', $timecard_date='', $owner='', $timecard_temp=''){
            return $this->model('TimecardsModel')->postAdd($user_id, $timecard_year, $timecard_month, $timecard_day, $timecard_date, $owner, $timecard_temp);
        }

        function list(){
            return $this->model('TimecardsList')->getList();
        }
<<<<<<< HEAD
        function setting(){
            return $this->model('TimecardSetting')->getList();
=======

        function groups($groupid=''){
            return $this->model('TimecardsList')->getTimecardsByGroup($groupid);
>>>>>>> d2925e12aa8d17457971237fe812c3476d877c03
        }
    }
?>