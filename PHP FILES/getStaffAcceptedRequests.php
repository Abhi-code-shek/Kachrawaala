<?php
$array = [];

$staffLoginId = $_POST['staffLoginId'];


$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

	$sql = "SELECT userrequest.reqId, userrequest.timeStamp, userrequest.timeSlot, userrequest.pincode, userrequest.address, services.serviceName, services.cost
			from iwp.userrequest,iwp.services
			where userrequest.staffId = $staffLoginId and userVer = 1 and staffVer = 0 and userrequest.serviceId = services.serviceId order by userrequest.timeStamp;";

	$result = $conn->query($sql);
	
	if($result == true){
		$array['result'] = 'success';
	    $array['remarks'] = 'Request successfully posted!';
			while($row = $result->fetch_assoc()){
				$reqId[]   	   = $row['reqId'];
				$timeStamp[]   = $row['timeStamp'];
				$timeSlot[]    = $row['timeSlot'];
				$pincode[]     = $row['pincode'];
				$address[]     = $row['address'];
				$serviceName[] = $row['serviceName'];
		    	$serviceCost[] = $row['cost'];
			}
	}
	else {
		    $array['result']  = 'failed';
		    $array['remarks'] = mysqli_error($conn);
	}
	$array['reqId']         = $reqId;
	$array['timeStamp']     = $timeStamp;
	$array['timeSlot']      = $timeSlot;
	$array['pincode']       = $pincode;
	$array['address']       = $address;
	$array['serviceName']   = $serviceName;
	$array['serviceCost']   = $serviceCost;

echo json_encode($array);
?>

