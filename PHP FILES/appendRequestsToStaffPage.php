<?php
$array      = [];
$staffLoginId = $_POST['staffLoginId'];

$servername = "localhost";
$user = "root";
$pass = null;

$conn = new mysqli($servername, $user, $pass);
if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;

}

// $data['staffEmail'] = $staffEmail;
// $data['id']         = $id;

$sql = "SELECT pincode, timeSlot from IWP.staffs where staffId = $staffLoginId;";
$result = $conn->query($sql);

if($result == true){
  	$array['result']  = 'success';
    $array['remarks'] = 'Task successfully completed!!';
  	$row 		= $result->fetch_assoc();
 	$pincode	= $row['pincode'];
	$timeSlot   = $row['timeSlot'];
}
else{
  	$array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
	$conn->close();
	echo json_encode( $array );
	return;
}

$count = 0;
$pins = "$pincode";
$loopHandler = 0;
$minCount = 3;
while ($count<$minCount) {
  $sql    = "SELECT count(*) as count from IWP.userRequest where pincode IN ( ". $pins . " ) and timeSlot='$timeSlot' AND staffId IS NULL";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $count = $row['count'];
  if($count<=$minCount){
    for($i=0;$i<10;$i++){
      $pins .= ',' . ($pincode + ($loopHandler*10) + $i) . ', ' . ($pincode - ($loopHandler*10) - $i);
    }
  }
  $loopHandler += 1;
  if($loopHandler >10){
    break;
  }
}
  
$sql    = "SELECT reqId,userId from IWP.userRequest where pincode IN ( ". $pins . " )  and timeSlot='$timeSlot' AND staffId IS NULL";
$result = $conn->query($sql);

$reqId = [];
if($result == true){
	  $array['result']  = 'success';
    $array['remarks'] = 'Task successfully completed!!';
    while ($row = $result->fetch_assoc()) {
    	$reqId[]         = $row['reqId'];
    	$userId[]        = $row['userId'];
    	$array['reqId']  = $reqId;
    	$array['userId'] = $userId;
    }
} 
else{
	$array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
	$conn->close();
	echo json_encode( $array );
	return;
}

$userId = implode(',', $userId);
$array['uid'] = $userId;

$userInfo = [];
$sql = "SELECT userId,name, phoneNumber FROM IWP.users WHERE userId IN ($userId)";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
	$temp = [];
	$temp['name']    	   = $row['name'];
	$temp['phoneNumber']   = $row['phoneNumber'];
	$userInfo[$row['userId']] = $temp;
}
$array['userInfo'] = $userInfo;

$conn->close();
echo json_encode( $array );
?>
