<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    /**
     *Database settings
    */
    // HOSTNAME
    define('DB_HOSTNAME', 'localhost');
    // DATABASE
    define('DB_DATABASE', 'cailygroupdb');
    // USERNAME
    define('DB_USERNAME', 'root');
    // PASSWORD
    define('DB_PASSWORD', '');
    // PORT
    define('DB_PORT', '');

    $conn = new mysqli(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    if($conn===false) {
        die("ERROR: Could Not Connect".mysqli_connect_error());
    }
?>