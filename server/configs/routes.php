<?php
    $routes['default_controller'] = 'home';
    /* 
    Đường dẫn ảo => Đường dẫn thật
    */
    // Group
    $routes['groups'] = 'groups';

    // Users
    $routes['users'] = 'users';
    $routes['users/add'] = 'users/add';
    $routes['users/edit/.+-(\d+)'] = 'users/edit/$1';
    $routes['users/delete/.+-(\d+)'] = 'users/delete/$1';

    // Authority
    $routes['authority'] = 'authority';
?>