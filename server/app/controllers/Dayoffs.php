<?php
    class Dayoffs extends Controller{
        function index(){
            $dataDayoffs = $this->model('DayoffsModel')->getDayoffs();
            
            $this->data['dayoffs'] = $dataDayoffs;
            // Render view
            // $this->render('dayoffs/index', $this->data);
        }

        // function detail($id=0){
        //     $home = $this->model('UsersModel');
        //     $this->data['info'] = $home->getDetail($id);
        //     $this->render('home/detail', $this->data);
            
        // }
    }
?>