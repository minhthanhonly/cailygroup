<?php
    class TimecardDetails extends Controller{
        function add($user_id='', $timecard_year='', $timecard_month='', $timecard_day='', $timecard_date='', $owner='', $timecard_temp=''){
            return $this->model('TimecardDetailsModel')->postAdd($user_id, $timecard_year, $timecard_month, $timecard_day, $timecard_date, $owner, $timecard_temp);
        }
        function update($timecard_now='', $timecard_originalclose='', $timecard_interval='', $overtime='', $timecardId=''){
            return $this->model('TimecardDetailsModel')->postUpdate($timecard_now, $timecard_originalclose, $timecard_interval, $overtime, $timecardId);
        }
        function updatecomment($comment = '',$id = ''){
            return $this->model('TimecardDetailsModel')->updateComment($comment,$id);
        }
    }
?>