<?php
    $routes['default_controller'] = 'home';
    /* 
    Đường dẫn ảo => Đường dẫn thật
    */
    // Login
    $routes['login'] = 'login';

    // Group
    $routes['groups'] = 'groups';
    $routes['groups/add'] = 'groups/add';
    $routes['groups/update'] = 'groups/update';
    $routes['groups/delete'] = 'groups/delete';
   

    // Users
    $routes['users'] = 'users';
    $routes['users/detail/.+-(\d+)'] = 'users/detail/$1';
    $routes['users/add'] = 'users/add';
    $routes['users/edit/.+-(\d+)'] = 'users/edit/$1';
    $routes['users/update'] = 'users/update';
    $routes['users/delete'] = 'users/delete';

    // Authority
    $routes['authority'] = 'authority';
    
    // dayoffs
    $routes['dayoffs'] = 'dayoffs';
    $routes['dayoffs/add'] = 'dayoffs/add';
    $routes['dayoffs/update/.+-(\d+)'] = 'dayoffs/update/$1';
    $routes['dayoffs/delete/.+-(\d+)'] = 'dayoffs/delete/$1';
    $routes['dayoffs/getforuser/.+-(\d+)'] = 'dayoffs/getforuser/$1';

    // timecards
    $routes['timecards'] = 'timecards';
    $routes['timecards/add'] = 'timecards/add';
    $routes['timecards/update/.+-(\d+)'] = 'timecards/update/$1';
    
    $routes['timecarddetails/add'] = 'timecarddetails/add';
    $routes['timecarddetails/update'] = 'timecarddetails/update';
    $routes['timecarddetails/updatecomment'] = 'timecarddetails/updatecomment';

    // holidays
    $routes['holidays'] = 'holidays';



?>