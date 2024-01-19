<?php
    class Home extends Controller {
        public $model_home;

        function __construct(){
            // $this->model_home = $this->model('HomeModel');
        }

        function index(){
            

            // $home = $this->model('HomeModel');
            // $dataHome = $home->getList();

            // $this->data['home'] = $dataHome;
            // // Render view
            $this->render('home/index');
            // $check = Session::data('username', 'Phan Ho Tu');
            
            // echo '<pre>';
            // print_r($sessionData);
            // echo '</pre>';

            // var_dump($check);

            // $check = Session::data('username', [
            //     'name' => 'Phan Tu',
            //     'email' => 'phantu3041@gmail.com'
            // ]);
            


            // var_dump($sessionData);
        }

        function detail($id=0){
            $home = $this->model('HomeModel');
            $this->data['info'] = $home->getDetail($id);
            $this->render('home/detail', $this->data);
            
        }

        function get_category(){
            $request = new Request();
            $data = $request->getFields();
            echo '<pre>';
            print_r($data);
            echo '</pre>';
            $this->render('categories/add');
        }

        function post_category(){
            $request = new Request();
            echo $request->getMethod();
            $cate = $request->getFields()['category_name'];
            $response = new Response();
            $response->redirect('users');
        }
    }
?>