<?php
    class Holidays extends Controller{
        function index(){
            $dataHolidays = $this->model('HolidaysModel')->getHolidays();
        }
    }
?>