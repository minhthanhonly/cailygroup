<?php
    class Timecardsholidays extends Controller{
        function index(){
            $dataTimecardsHolidays = $this->model('TimecardsHolidaysModel')->getTimecardsHolidays();
        }
        function add($name = '', $days = ''){
            {
                return $this->model('TimecardsHolidaysModel')->addTimecardsHolidays($name, $days);
            }
        }
        function update($id = '', $name = '', $days = '') {
            return $this->model('TimecardsHolidaysModel')->updateTimecardsHolidays($id, $name,$days);
        }
        function delete($id = '') {
            return $this->model('TimecardsHolidaysModel')->deleteTimecardsHolidays($id);
        }
    }
?>