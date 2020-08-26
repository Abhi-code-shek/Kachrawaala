<?php
$array = [];

$checkPincodeValue    = $_POST['checkPincodeValue'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

$sql = "SELECT count(pincode) as pincode , area as requestArea FROM IWP.pincodes where pincode = '$checkPincodeValue' ; ";
$array['pincode'] = $sql;
$result = $conn->query($sql);


if ($result == true) {
	$row = $result->fetch_assoc();
	$count = $row['pincode'];
	$requestArea = $row['requestArea'];
	$array['requestArea'] = $requestArea;
	$array['count'] = $count;
	if($count != 0){
		$array['result'] = 'success';
	    $array['remarks'] = 'Valid Pincode!';
	}
	else {
	    $array['result']  = 'failed';
	    $array['remarks'] = mysqli_error($conn);
		echo json_encode($array);
	    return;
	}
}
else {
    $array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
	echo json_encode($array);
    return;
}
// $array['count'] = $count;
// ////inserting users/////

echo json_encode($array);
?>