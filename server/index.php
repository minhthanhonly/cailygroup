<?php
    define('__DIR_ROOT', __DIR__);
    // require(__DIR__.'/config.php');
    // require(__DIR__.'/database/DBConnect.php');
    require_once(__DIR__.'/configs/database.php');
    require_once(__DIR__.'/configs/routes.php');
    require_once(__DIR__.'/core/Route.php');
    require_once(__DIR__.'/app/App.php');
    require_once(__DIR__.'/core/Controller.php');
    $app = new App();

?>