<?php
$array = [];

$houseName 					   = $_POST['houseName'];
$checkPincodeValue             = $_POST['checkPincodeValue'];
$timeSlot       			   = $_POST['timeSlot'];
$areaCorrespondingToThePincode = $_POST['areaCorrespondingToThePincode'];
$userLoginId 				   = $_POST['userLoginId'];
$serviceName				   = $_POST['serviceName'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

	$sql = "SELECT serviceId FROM iwp.services WHERE serviceName='$serviceName' ;";
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	$serviceId = $row['serviceId'];
	
	$sql = "INSERT INTO IWP.userRequest (`userId`,`timeSlot`,`pincode`,`area`,`address`,`serviceId`) VALUES ($userLoginId,'$timeSlot','$checkPincodeValue','$areaCorrespondingToThePincode','$houseName',$serviceId); ";
	$array['x']=$sql;
	$result = $conn->query($sql);
	if($result == true){
		$array['result'] = 'success';
	    $array['remarks'] = 'Request successfully posted!';
	}
	else {
		    $array['result']  = 'failed';
		    $array['remarks'] = mysqli_error($conn);
	}


	// if ($result == true) {
	// 	$sql = "SELECT reqId FROM IWP.userRequest WHERE userEmail='$userSignUpEmail';"; 
	// 	$result2 = $conn->query($sql);	
	// 	$rows = $result2->fetch_assoc();
	// 	$userId  = $rows['userId'];
	// 	$array['id'] = $userId;
	// }
echo json_encode($array);
?>

