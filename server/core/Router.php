<?php
    class Router
    {
        function __construct(){

        }

        private function getRequestURL(){
            echo '<pre>';
            print_r($_SERVER);
            echo '</pre>';
        }
        public function run(){
            $this->getRequestURL();
        }
    }
    
?>