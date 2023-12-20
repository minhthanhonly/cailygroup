<?php
    require_once(dirname(__FILE__).'/Router.php');

    class App
    {
        private $router;
        function __construct(){
            $this->router = new Router;
        }
        public function run(){
            $this->router->run();
        }
    }
    
?>