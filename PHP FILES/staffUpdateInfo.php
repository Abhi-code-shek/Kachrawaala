<?php
$array = [];

$staffFullName    = $_POST['staffFullName'];
$staffPhoneNumber = $_POST['staffPhoneNumber'];
$staffLoginId     = $_POST['staffLoginId'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

$sql = "UPDATE IWP.staffs set `name` = '$staffFullName', `phoneNumber` = '$staffPhoneNumber' where staffId = $staffLoginId; ";
$array['query']=$sql;
$result = $conn->query($sql);
if($result == true){
	$array['result'] = 'success';
    $array['remarks'] = 'Account successfully updated! Please Login to continue..';
}
else {
    $array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
    return;
}
echo json_encode($array);
?>