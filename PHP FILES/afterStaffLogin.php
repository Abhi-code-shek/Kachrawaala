<?php
	$array = [];

	$staffEmailLogin    = $_POST['staffEmailLogin'];
	$staffPasswordLogin = $_POST['staffPasswordLogin'];

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

	$sql = "SELECT staffId as staffIdAfterLogin from IWP.staffs where staffEmail = '$staffEmailLogin'";
	$array['querry'] = $sql;
	$result = $conn->query($sql);

	if($result == true){
		$row = $result->fetch_assoc();
		$count = $row['staffIdAfterLogin'];
		$array['staffIdAfterLogin'] = $count;
		$staffIdAfterLogin = $array['staffIdAfterLogin'];

	}
	else{
		$array['result']  = 'failed';
		$array['remarks'] = mysqli_error($conn);
	}
	if($count != 0){
		$sql = "SELECT password from IWP.staffs where staffId = $staffIdAfterLogin";
		$array['password'] = $sql;
		$result = $conn->query($sql);
		if($result == true){
			$row = $result->fetch_assoc();
			$password = $row['password'];
				if($staffPasswordLogin == $password){
					$array['result']  = 'success';
					$array['remarks'] = 'Staff successfully Loged-in! Click OK to browse through the services..';
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