<?php
    class Timecards extends Controller{
        function add($user_id='', $timecard_year='', $timecard_month='', $timecard_day='', $timecard_date='', $owner='', $timecard_temp=''){
            return $this->model('TimecardsModel')->postAdd($user_id, $timecard_year, $timecard_month, $timecard_day, $timecard_date, $owner, $timecard_temp);
        }
        // function update($id){
        //     return $this->model('TimecardsModel')->updateTimecards($id);
        // }
    }
?>