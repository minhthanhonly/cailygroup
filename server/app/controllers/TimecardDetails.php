<?php
    class TimecardDetails extends Controller{
        function add($user_id='', $timecard_year='', $timecard_month='', $timecard_day='', $timecard_date='', $owner='', $timecard_temp=''){
            return $this->model('TimecardDetailsModel')->postAdd($user_id, $timecard_year, $timecard_month, $timecard_day, $timecard_date, $owner, $timecard_temp);
        }
        function update($timecard_now='', $timecard_originalclose='', $timecard_interval='', $overtime='', $editor='', $timecardId=''){
            return $this->model('TimecardDetailsModel')->postUpdate($timecard_now, $timecard_originalclose, $timecard_interval, $overtime, $editor, $timecardId);
        }
        function updatecomment($comment = '',$id = ''){
            return $this->model('TimecardDetailsModel')->updateComment($comment,$id);
        }
        function updateall(){
            return $this->model('TimecardDetailsModel')->updateAll();
        }
        // function updateall($id='', $timecard_open='', $timecard_close='', $timecard_time='', $timecard_timeover='', $timecard_comment='', $updatedAt=''){
        //     return $this->model('TimecardDetailsModel')->updateAll($id, $timecard_open, $timecard_close, $timecard_time, $timecard_timeover, $timecard_comment, $updatedAt);
        // }
    }
?>