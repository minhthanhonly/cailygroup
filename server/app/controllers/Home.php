<?php
    class Home extends Controller {
        public $model_home;
        public $data;

        function __construct(){
            // $this->model_home = $this->model('HomeModel');
        }

        function index(){
            $home = $this->model('HomeModel');
            $dataHome = $home->getList();

            $this->data['home'] = $dataHome;
            // Render view
            $this->render('home/index', $this->data);
        }

        function detail($id=0){
            $home = $this->model('HomeModel');
            $this->data['info'] = $home->getDetail($id);
            $this->render('home/detail', $this->data);
            
        }

        // function search(){
        //     $keyword = $_GET['keyword'];
        // }
    }
?>