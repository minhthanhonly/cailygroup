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
    }
?>