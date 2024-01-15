<?php
    class Config extends Controller{
        function index(){
            $dataConfig = $this->model('ConfigModel')->getConfig();
        }
    }
?>