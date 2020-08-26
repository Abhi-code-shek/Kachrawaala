<?php

$data       = [];
$id         = [];
$staffEmail = [];

$servername = "localhost";
$user = "root";
$pass = null;

$conn = new mysqli($servername, $user, $pass);
if ($conn->connect_error) {
    $data['remarks'] = "Connection failed: " . $conn->connect_error;

}

$data['staffEmail'] = $staffEmail;
$data['id']         = $id;

$sql = "SELECT staffId, staffEmail from IWP.staffs where timeSlot='' and name IS NOT NULL;";
$result = $conn->query($sql);
if($result == true){
  	$data['result'] = 'success';
    $data['remarks'] = 'Task successfully completed!!';
  	while($row = $result->fetch_assoc()){
     	$staffEmail[] = $row['staffEmail'];
    	$id[]         = $row['staffId'];
  	} 
}
else{
  	$data['result']  = 'failed';
    $data['remarks'] = mysqli_error($conn);
}

$data['staffEmail'] = $staffEmail;
$data['id']   = $id;

$conn->close();
echo json_encode( $data );
?>
