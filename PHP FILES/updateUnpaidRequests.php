<?php
$array = [];

$currentReqId = $_POST['currentReqId'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

	$sql    = "UPDATE iwp.userrequest SET userVer = 1 WHERE reqId = $currentReqId ;";
	$result = $conn->query($sql);
	
	if($result == true){
		$array['result']  = 'success';
	    $array['remarks'] = 'Successfully Paid!!';
	}
	else {
		    $array['result']  = 'failed';
		    $array['remarks'] = mysqli_error($conn);
	}

echo json_encode($array);
?>

