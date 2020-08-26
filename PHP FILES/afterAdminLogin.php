<?php
	$array = [];

	$adminEmailLogin    = $_POST['adminEmailLogin'];
	$adminPasswordLogin = $_POST['adminPasswordLogin'];

	$array['result']  = 'failed';
	$array['remarks'] = 'Something went wrong! Please try again! ';

	$servername = "localhost";
	$user = "root";
	$pass = null;


	$conn = new mysqli($servername, $user, $pass);

	if ($conn->connect_error) {
	    $array['remarks'] = "Connection failed: " . $conn->connect_error;
	}
	////Check the Password for the user Login///

	$sql = "SELECT adminId as adminIdAfterLogin from IWP.admins where adminEmail = '$adminEmailLogin'";
	$array['querry'] = $sql;
	$result = $conn->query($sql);

	if($result == true){
		$row = $result->fetch_assoc();
		$count = $row['adminIdAfterLogin'];
		$array['adminIdAfterLogin'] = $count;
		$adminIdAfterLogin = $array['adminIdAfterLogin'];

	}
	else{
		$array['result']  = 'failed';
		$array['remarks'] = mysqli_error($conn);
	}
	if($count != 0){
		$sql = "SELECT password from IWP.admins where adminId = $adminIdAfterLogin";
		$array['password'] = $sql;
		$result = $conn->query($sql);
		if($result == true){
			$row = $result->fetch_assoc();
			$password = $row['password'];
				if($adminPasswordLogin == $password){
					$array['result']  = 'success';
					$array['remarks'] = 'Admin successfully Loged-in! Click OK to browse through the services..';
				}
				else{
					$array['result']  = 'failed';
					$array['remarks'] = 'Password entered is not Valid!!';
				}
		}
	}
	else{
		$array['NoSuchEmail'] = 'INVALID EMAIL ENTERED!!';
		$array['result']  = 'failed';
		$array['remarks'] = mysqli_error($conn);
	}
	echo json_encode($array);
?>