<?php
  include('config.php');
  $rest_json = file_get_contents("php://input");
  $_POST = json_decode($rest_json, true);
  print_r($_POST);
  $query = "INSERT INTO client_details (ip_address, TIME) VALUES ('$_POST[ip_address]', CURRENT_TIMESTAMP())";
  mysqli_query($db, $query);
?>
