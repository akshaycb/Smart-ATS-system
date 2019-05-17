<?php
  error_reporting(0);

  //accept request
  $rest_json = file_get_contents("php://input");
  $_POST = json_decode($rest_json, true);
  //categorize what to do. if URL is received, call get_summary function to get URL's texts
  if($_POST['link']){
    $url = $_POST['link'];
    get_summary($url);
  }else {
    $ip_address = $_POST['ip_address'];
    insert_ip_address($ip_address);
  }

//to insert ip_address to database
  function insert_ip_address($ip_address){
    include('config.php');
    $query = "INSERT INTO client_details (ip_address, TIME) VALUES ('$ip_address', CURRENT_TIMESTAMP())";
    mysqli_query($db, $query);
  }
//to parse the URL
  function get_summary($url){
    $html = file_get_contents($url);
    $summary = strip_tags($html);
    if(!$summary){
      $summary = false;
    }
    $summary_json = array('message' => $summary);
    echo json_encode($summary_json);
  }
?>
