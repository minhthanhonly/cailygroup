<?php
    class App {
        private $__controller, $__action, $__params, $__routes;

        function __construct(){
            global $routes;

            $this->__routes = new Route();

            if(!empty($routes['default_controller'])) {
                $this->__controller = $routes['default_controller'];
            }
            $this->__action = 'index';
            $this->__params = [];
            $this->handleUrl();
        }

        function getUrl(){
            if(!empty($_SERVER['PATH_INFO'])){
                $url = $_SERVER['PATH_INFO'];
            } else {
                $url = '/';
            }
            return $url;
        }

        function handleUrl(){
            $url = $this->getUrl();
            $url = $this->__routes->handleRoute($url);
            $urlArr = array_filter(explode('/', $url));
            $urlArr = array_values($urlArr);
            
            // Xử lý controller
            if(!empty($urlArr[0])){
                $this->__controller = ucfirst($urlArr[0]);
            } else {
                $this->__controller = ucfirst($this->__controller);
            }

            // echo '<pre>';
            // print_r($urlArr);
            // echo '</pre>';

            // echo $this->__controller;

            if(file_exists('app/controllers/'.$this->__controller.'.php')) {
                require_once 'app/controllers/'.($this->__controller).'.php';
                // Kiểm tra class $this->__controller tồn tại
                if(class_exists($this->__controller)) {
                    $this->__controller = new $this->__controller(); 
                    unset($urlArr[0]);
                } else {
                    $this->loadError();
                }
            } else {
                $this->loadError();
            }

            // Xử lý action
            if(!empty($urlArr[1])){
                $this->__action = $urlArr[1];
                unset($urlArr[1]);
            }

            // Xử lý params
            $this->__params = array_values($urlArr);

            // Kiểm tra method tồn tại
            if(method_exists($this->__controller, $this->__action)) {
                call_user_func_array([$this->__controller, $this->__action], $this->__params);
            } else {
                $this->loadError();
            }
        }

        function loadError($name='404'){
            require_once 'errors/'.$name.'.php';
        }
    }
?>