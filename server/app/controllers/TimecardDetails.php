<?php
    class TimecardDetails extends Controller{
        function add(){
            return $this->model('TimecardDetailsModel')->postAdd();
        }
        function addnew(){
            return $this->model('TimecardDetailsModel')->postAddNew();
        }
        function update($timecard_now='', $timecard_originalclose='', $timecard_interval='', $overtime='', $timecardId=''){
            return $this->model('TimecardDetailsModel')->postUpdate($timecard_now, $timecard_originalclose, $timecard_interval, $overtime, $timecardId);
        }
        function updatecomment($comment = '',$id = ''){
            return $this->model('TimecardDetailsModel')->updateComment($comment,$id);
        }
        function updateall(){
            return $this->model('TimecardDetailsModel')->updateAll();
        }
    }
?>