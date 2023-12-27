<?php
    class Dayoffs extends Controller{
        function index(){
            $dataDayoffs = $this->model('DayoffsModel')->getDayoffs();
        }

        function add($userid='', $date_start='', $date_end='', $time_start='', $time_end='', $note='', $day_number='', $status='', $owner=''){
            return $this->model('DayoffsModel')->postAdd($userid, $date_start, $date_end, $time_start, $time_end, $note, $day_number, $status, $owner);
        }
    }
?>