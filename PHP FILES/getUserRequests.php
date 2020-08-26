<?php
$array = [];

$userLoginId = $_POST['userLoginId'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

	$sql = "SELECT userrequest.reqId, userrequest.timeStamp, userrequest.timeSlot, userrequest.pincode, userrequest.address, 
	services.serviceName, staffs.name, services.cost
			from iwp.userrequest,iwp.services,iwp.staffs 
			where userrequest.userId = $userLoginId and userrequest.serviceId = services.serviceId 
			and userrequest.staffId = staffs.staffId and staffVer = 1 order by userrequest.timeStamp;";
	$result = $conn->query($sql);
	
	if($result == true){
		$array['result'] = 'success';
	    $array['remarks'] = 'Request successfully posted!';
			while($row = $result->fetch_assoc()){
				$reqId[] 	   = $row['reqId'];
				$timeStamp[]   = $row['timeStamp'];
				$timeSlot[]    = $row['timeSlot'];
				$pincode[]     = $row['pincode'];
				$address[]     = $row['address'];
				$serviceName[] = $row['serviceName'];
				$staffName[]   = $row['name'];
		    	$serviceCost[] = $row['cost'];
			}
	}
	else {
		if($timeStamp.length == 0){
			$array['remarks'] = 'No such Requests';
		}
		    $array['result']  = 'failed';
		    $array['remarks'] = mysqli_error($conn);
	}

	$array['reqId']         = $reqId;
	$array['timeStamp']     = $timeStamp;
	$array['timeSlot']      = $timeSlot;
	$array['pincode']       = $pincode;
	$array['address']       = $address;
	$array['serviceName']   = $serviceName;
	$array['staffName']     = $staffName;
	$array['serviceCost']   = $serviceCost;

echo json_encode($array);
?>

