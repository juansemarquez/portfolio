<?php
require_once '.connect.php';
$now = new \DateTime();
$now_insert = $now->format('Y-m-d H:i:s');

$con = connect();
if (is_object($con)) {
    $q = "INSERT INTO commands (command, time) ";
    $q.= "VALUES (?,?)";
    $command = strlen($_POST['command']) > 20 ? substr($_POST['command'], 0, 20) : $_POST['command'];

    $data = [ $_POST['command'], $now_insert ];
    try {
        $con->beginTransaction();
        $insert = $con->prepare($q);
        $insert->execute($data);
        $con->commit();
        echo "OK";
    }
    catch (PDOException $e) {
        $con->rollback();
        echo $e->getMessage();
    }
}
else {
    echo $con;
}
