<?php
    $routes['default_controller'] = 'home';
    /* 
    Đường dẫn ảo => Đường dẫn thật
    */
    // Login
    $routes['login'] = 'login';

    // Dashboard
    $routes['dashboard'] = 'dashboard';

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
    $routes['users/editcomment'] = 'users/editcomment';
    $routes['users/delete'] = 'users/delete';
    $routes['users/groups/.+-(\d+)'] = 'users/groups/$1';

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
    $routes['timecards/load/.+-(\d+)'] = 'timecards/load/$1';
    $routes['timecards/getall/.+-(\d+)'] = 'timecards/getall/$1';
    $routes['timecards/add'] = 'timecards/add';
    $routes['timecards/update/.+-(\d+)'] = 'timecards/update/$1';
    
    // timecardslist
    $routes['timecards/list'] = 'timecards/list';

    $routes['timecarddetails/add'] = 'timecarddetails/add';
    $routes['timecarddetails/update'] = 'timecarddetails/update';
    $routes['timecarddetails/updatecomment'] = 'timecarddetails/updatecomment';


    //timecardsetting
     $routes['timecards/setting'] = 'timecards/setting';

    // holidays
    $routes['holidays'] = 'holidays';

    // timecardsHolidays
    $routes['timecardsholidays'] = 'timecardsholidays';
    $routes['timecardsholidays/add'] = 'timecardsholidays/add';
    $routes['timecardsholidays/update'] = 'timecardsholidays/update';
    $routes['timecardsholidays/delete'] = 'timecardsholidays/delete';
?>