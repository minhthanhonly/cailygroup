<?php
    class Controller{
        function model($model){
            if(file_exists(__DIR_ROOT.'/app/models/'.$model.'.php')) {
                require_once __DIR_ROOT.'/app/models/'.$model.'.php';
                if(class_exists($model)) {
                    $model = new $model();
                    return $model;
                }
            }
            return false;
        }
        function render($view, $data=[]){
            extract($data);
            if(file_exists(__DIR_ROOT.'/app/views/'.$view.'.php')) {
                require_once __DIR_ROOT.'/app/views/'.$view.'.php';
            }
        }
    }
?>