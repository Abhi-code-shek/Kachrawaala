<?php
$array = [];

$adminSignUpEmail = $_POST['adminSignUpEmail'];
$adminSignUpPassword = $_POST['adminSignUpPassword'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

//////entry of new user//////
$sql = "SELECT count(adminId) as id FROM IWP.admins WHERE adminEmail='$adminSignUpEmail' ; ";
$array['id'] = $sql;
$result = $conn->query($sql);


if ($result == true) {
	$row = $result->fetch_assoc();
	$count = $row['id'];
	$array['count'] = $count;
}
else {
    $array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
    return;
}
$array['count'] = $count;
////inserting admin/////
if($count == 0){
	$sql = "INSERT INTO IWP.admins (`password`,`adminEmail`) VALUES ('$adminSignUpPassword','$adminSignUpEmail'); ";
	$array['x']=$sql;
	$result = $conn->query($sql);
	if ($result == true) {
		$sql = "SELECT adminId FROM IWP.admins WHERE adminEmail='$adminSignUpEmail';"; 
		$result2 = $conn->query($sql);	
		$rows = $result2->fetch_assoc();
		$userId  = $rows['adminId'];
		$array['id'] = $userId;
	}
	if($result2 == true){
		$array['result'] = 'success';
	    $array['remarks'] = 'Admin successfully registered! Please Login to continue..';
	}
	else {
		    $array['result']  = 'failed';
		    $array['remarks'] = mysqli_error($conn);
	}
}
echo json_encode($array);
?>