<?php
$array = [];

$userLoginId     = $_POST['userLoginId'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

$sql = "SELECT count(name) as name FROM IWP.users where userId = $userLoginId; ";
$array['name'] = $sql;
$result = $conn->query($sql);


if ($result == true) {
	$row = $result->fetch_assoc();
	$count = $row['name'];
	$array['count'] = $count;
	if($count != 0){
		$array['result'] = 'success';
	    $array['remarks'] = 'Account Already updated!';
	}
	else {
	    $array['result']  = 'failed';
	    $array['remarks'] = 'failed';
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