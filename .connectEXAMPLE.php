<?php
function connect() {
    $server = 'localhost';
    $user = 'my_user';
    $pass = 'supersecret';
    $db_name = 'my_db';

    try {
        $string = "mysql:host=$server;dbname=$db_name;charset=utf8";
        $con = new PDO($string,$user,$pass);
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $con;
      }
      catch (PDOException $e) {
        return $e->getMessage();
      }
}



