<?php
$array = [];

$pincodeAllotedByAdmin    = $_POST['pincodeAllotedByAdmin'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

$sql = "SELECT count(pincode) as pincode FROM IWP.pincodes where pincode = '$pincodeAllotedByAdmin' ; ";
$array['pincode'] = $sql;
$result = $conn->query($sql);


if ($result == true) {
	$row = $result->fetch_assoc();
	$count = $row['pincode'];
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
echo json_encode($array);
?>