<?php
    class Dayoffs extends Controller{
        function index(){
            $dataDayoffs = $this->model('DayoffsModel')->getDayoffs();
        }

        function add($user_id='', $date_start='', $date_end='', $time_start='', $time_end='', $note='', $day_number='', $status='', $owner=''){
            return $this->model('DayoffsModel')->postAdd($user_id, $date_start, $date_end, $time_start, $time_end, $note, $day_number, $status, $owner);
        }

        function delete($id){
            return $this->model('DayoffsModel')->deleteDayoffs($id);
        }
        function update($id){
            return $this->model('DayoffsModel')->updateDayoffs($id);
        }
    }
?>
