<?php
    class Timecards extends Controller{
        function index(){
            $datatimecard = $this->model('TimecardsModel')->getTimecards();
        }
        function add($user_id='', $timecard_year='', $timecard_month='', $timecard_day='', $timecard_date='', $owner='', $timecard_temp=''){
            return $this->model('TimecardsModel')->postAdd($user_id, $timecard_year, $timecard_month, $timecard_day, $timecard_date, $owner, $timecard_temp);
        }
    }
?>