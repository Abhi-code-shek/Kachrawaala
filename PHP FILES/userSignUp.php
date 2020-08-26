<?php
$array = [];

$userSignUpEmail = $_POST['userSignUpEmail'];
$userSignUpPassword = $_POST['userSignUpPassword'];


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
$sql = "SELECT count(userId) as id FROM IWP.users WHERE userEmail='$userSignUpEmail' ; ";
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
////inserting users/////
if($count == 0){
	$sql = "INSERT INTO IWP.users (`password`,`userEmail`) VALUES ('$userSignUpPassword','$userSignUpEmail'); ";
	$array['x']=$sql;
	$result = $conn->query($sql);
	if ($result == true) {
		$sql = "SELECT userId FROM IWP.users WHERE userEmail='$userSignUpEmail';"; 
		$result2 = $conn->query($sql);	
		$rows = $result2->fetch_assoc();
		$userId  = $rows['userId'];
		$array['id'] = $userId;
	}
	if($result2 == true){
		$array['result'] = 'success';
	    $array['remarks'] = 'User successfully registered! Please Login to continue..';
	}
	else {
		    $array['result']  = 'failed';
		    $array['remarks'] = mysqli_error($conn);
	}
}


echo json_encode($array);
?>