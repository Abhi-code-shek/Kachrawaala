<?php
$array = [];

$name  = $_POST['name'];
$email = $_POST['email'];
$msg   = $_POST['msg'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

$sql = "INSERT INTO IWP.contact (`name`,`userContctEmail`,`contactMessage`) VALUES ('$name','$email','$msg'); ";
$array['x']=$sql;
$result = $conn->query($sql);
// if ($result == true) {
// 	$sql = "SELECT userId FROM IWP.users WHERE userEmail='$userContactEmail';"; 
// 	$result2 = $conn->query($sql);	
// 	$rows = $result2->fetch_assoc();
// 	$userId  = $rows['userId'];
// 	$array['id'] = $userId;
// 	// $sql = "UPDATE IWP.contact set userId = '$userId' where userContactEmail = 'userContactEmail';";
// 	// $array['y'] = $sql;
// 	// $result3 = $conn->query($sql);
// }
if($result == true){
	$array['result'] = 'success';
    $array['remarks'] = 'Details inserted!';
}
else {
    $array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
}
echo json_encode($array);
?>