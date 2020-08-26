<?php
	$array = [];

	$userEmailLogin    = $_POST['userEmailLogin'];
	$userPasswordLogin = $_POST['userPasswordLogin'];
	//$userSignUpId      = $_POST('userSignUpId');

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

	$sql = "SELECT userId as userIdAfterLogin from IWP.users where userEmail = '$userEmailLogin'";
	$array['querry'] = $sql;
	$result = $conn->query($sql);

	if($result == true){
		$row = $result->fetch_assoc();
		$count = $row['userIdAfterLogin'];
		$array['userIdAfterLogin'] = $count;
		$userIdAfterLogin = $array['userIdAfterLogin'];

	}
	else{
		$array['result']  = 'failed';
		$array['remarks'] = mysqli_error($conn);
	}
	if($count != 0){
		$sql = "SELECT password from IWP.users where userId = $userIdAfterLogin";
		$array['password'] = $sql;
		$result = $conn->query($sql);
		if($result == true){
			$row = $result->fetch_assoc();
			$password = $row['password'];
				if($userPasswordLogin == $password){
					$array['result']  = 'success';
					$array['remarks'] = 'User successfully Loged-in! Click OK to browse through our services..';
				}
				else{
					$array['result']  = 'failed';
					$array['remarks'] = 'Password entered is not Valid!!';
				}
		}
	}
	else{
		$array['result']  = 'failed';
		$array['remarks'] = mysqli_error($conn);
	}
	echo json_encode($array);
?>