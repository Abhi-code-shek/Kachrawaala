<?php
$array = [];

$currentStaffId = $_POST['currentStaffId'];
$currentUserId  = $_POST['currentUserId'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

$sql = "UPDATE IWP.userRequest set staffId = $currentStaffId where userId = $currentUserId; ";
$array['x']=$sql;
$result = $conn->query($sql);
if($result == true){
	$array['result'] = 'success';
    $array['remarks'] = 'Staff accepted request!';
}
else {
    $array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
    $conn->close();
	echo json_encode( $array );
	return;
}
echo json_encode($array);
?>

