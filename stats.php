<?php
require_once '.connect.php';
function stats($ip, $referer, $ua, $name) {
    //$ip = $_POST['ip'];
    //$referer = $_POST['referer'];
    //$ua = $_POST['ua'];
    //$name = $_POST['name'];
    $now = new \DateTime();
    $now_insert = $now->format('Y-m-d H:i:s');

    $con = connect();
    if (is_object($con)) {
        $q = "INSERT INTO stats (ip, referer, ua, name, time) ";
        $q.= "VALUES (?,?,?,?,?)";
        try {
            $con->beginTransaction();
            $insert = $con->prepare($q);
            $data = [ $ip, $referer, $ua, $name, $now_insert ];
            $insert->execute($data);
            $con->commit();
            return "OK";
        }
        catch (PDOException $e) {
            $con->rollback();
            return $e->getMessage();
        }
    }
}
