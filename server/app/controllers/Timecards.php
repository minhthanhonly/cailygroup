<?php
    class Timecards extends Controller{
        function update($id){
            return $this->model('TimecardsModel')->updateTimecards($id);
        }
    }
?>