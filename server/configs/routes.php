<?php
    $routes['default_controller'] = 'home';
    /* 
    Đường dẫn ảo => Đường dẫn thật
    */
    // $routes['users-list'] = 'users/index';
    // $routes['users/.+-(\d+)'] = 'users/edit/$1';

    // Users
    $routes['users'] = 'users';
    $routes['users/edit/.+-(\d+)'] = 'users/edit/$1';
    $routes['users/delete/.+-(\d+)'] = 'users/delete/$1';
?>