<?php
$array = [];

$staffSignUpEmail = $_POST['staffSignUpEmail'];
$staffSignUpPassword = $_POST['staffSignUpPassword'];



$array['result']  = 'failed';
$array['remarks'] = 'Something went wrong! Please try again! ';

$servername = "localhost";
$user = "root";
$pass = null;


$conn = new mysqli($servername, $user, $pass);

if ($conn->connect_error) {
    $array['remarks'] = "Connection failed: " . $conn->connect_error;
}

//////entry of new user//////
$sql = "SELECT count(staffId) as id FROM IWP.staffs WHERE staffEmail='$staffSignUpEmail' ; ";
$array['id'] = $sql;
$result = $conn->query($sql);


if ($result == true) {
	$row = $result->fetch_assoc();
	$count = $row['id'];
	$array['count'] = $count;
}
else {
    $array['result']  = 'failed';
    $array['remarks'] = mysqli_error($conn);
    return;
}
$array['count'] = $count;
////inserting users/////
if($count == 0){
	$sql = "INSERT INTO IWP.staffs (`password`,`staffEmail`) VALUES ('$staffSignUpPassword','$staffSignUpEmail'); ";
	$array['x']=$sql;
	$result = $conn->query($sql);
	if ($result == true) {
		$sql = "SELECT staffId FROM IWP.staffs WHERE staffEmail='$staffSignUpEmail';"; 
		$result2 = $conn->query($sql);	
		$rows = $result2->fetch_assoc();
		$userId  = $rows['staffId'];
		$array['id'] = $userId;
	}
	if($result2 == true){
		$array['result'] = 'success';
	    $array['remarks'] = 'Staff successfully registered! Please Login to continue..';
	}
	else {
		    $array['result']  = 'failed';
		    $array['remarks'] = mysqli_error($conn);
	}
}

// $myfile = fopen("staffSignUp.txt", "a");
// $myfile = fopen("staffSignUp.txt", "a") or die("Unable to open file!");
// $txt = $staffSignUpEmail . "   " . $staffSignUpPassword;
// // fwrite($myfile, $txt);
// // $txt = $userSignUpPassword . "\n";
// fwrite($myfile, $txt);
// fclose($myfile);

// $myfile = fopen("staffSignUp.txt", "r") or die("Unable to open file!");
// $array['myfile'] = $myfile;
  	

// $finText = "<table>";
// //$menu = fread($myfile,filesize("menu.txt"))
// while(!feof($myfile)) {
//     $tempText = "<tr>";
//     $menu= fgets($myfile);
//     $menu = explode("   ",$menu);
//     $tempText .= "<td>";
//     $tempText .= "<h4>User Email</h4>";
//     $tempText .= "</td>";
//     $tempText .= "<td>";
//     $tempText .= "<h4>Password</h4>";
//     $tempText .= "</td>";
//     $tempText .= "<td>";
//     for($i=0;$i<count($menu);$i+=1){
//         $tempText .= ('<br>'.$menu[$i]);
//     }
//     $tempText .= "</td>";
//     $tempText .= "</tr>";
//     if(count($menu)>1) $finText.=$tempText;
// }
// $finText .= "</table><style>table,tr,td {border-style: solid;}</style>";
// echo $finText;
// $array['finText'] = $finText;
// fclose($myfile);


echo json_encode($array);
?>