<?php
$array = [];

$adminFullName    = $_POST['adminFullName'];
$adminPhoneNumber = $_POST['adminPhoneNumber'];
$adminLoginId     = $_POST['adminLoginId'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

$sql = "UPDATE IWP.admins set `name` = '$adminFullName', `phoneNumber` = '$adminPhoneNumber' where adminId = $adminLoginId; ";
$array['query']=$sql;
$result = $conn->query($sql);
if($result == true){
	$array['result'] = 'success';
    $array['remarks'] = 'Admin successfully updated account! Please continue..';
}
else {
    $array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
    return;
}
echo json_encode($array);
?>