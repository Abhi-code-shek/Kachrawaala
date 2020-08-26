<?php
$array = [];

$pincodeAllotedByAdmin       = $_POST['pincodeAllotedByAdmin'];
$vehicleNumberAllotedByAdmin = $_POST['vehicleNumberAllotedByAdmin'];
$timeSlot                    = $_POST['timeSlot'];
$currentStaffId     		 = $_POST['currentStaffId'];



$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

$sql = "UPDATE IWP.staffs set `pincode` = '$pincodeAllotedByAdmin', `vehicleNumber` = '$vehicleNumberAllotedByAdmin', `timeSlot` = '$timeSlot' where staffId = $currentStaffId; ";
$array['query']=$sql;
$result = $conn->query($sql);
if($result == true){
	$array['result'] = 'success';
    $array['remarks'] = 'Staff account successfully updated! Please Login to continue..';
}
else {
    $array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
    echo json_encode($array);
	return;
}
echo json_encode($array);
?>