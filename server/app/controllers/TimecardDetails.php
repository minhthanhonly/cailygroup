<?php
    class TimecardDetails extends Controller{
        function add($user_id='', $timecard_year='', $timecard_month='', $timecard_day='', $timecard_date='', $owner='', $timecard_temp=''){
            return $this->model('TimecardDetailsModel')->postAdd($user_id, $timecard_year, $timecard_month, $timecard_day, $timecard_date, $owner, $timecard_temp);
        }
        // function update($id){
        //     return $this->model('TimecardDetailsModel')->updateTimecards($id);
        // }
    }
?>