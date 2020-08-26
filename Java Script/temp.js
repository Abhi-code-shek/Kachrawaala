
var userSignUpId;
var userLoginId;
var staffLoginId;
var adminLoginId;

//|||||||||||||||||||||||||||||||||||Logout||||||||||||||||||||||||||||||||||||||||||||||||

function goTOHome(){
	window.open("index.html","_self");
	window.alert("Log in to Avail the services!");
}


//|||||||||||||||||||||||||||||||||staff confirms user's payments|||||||||||||||||||||||||||||||||||||||||||||||||

function confirmUserPayments(){
	window.open("staffPaymentsVerification.html","_self");
}

$(document).ready(function(){
	// console.log(window.location.href.split('/')[4]);
	if(window.location.href.split('/')[4]=="staffPaymentsVerification.html"){
		var html = '';
		staffLoginId = localStorage.getItem("staffLoginId");
		$.ajax({
				url: "PHP/getStaffAcceptedRequests.php",
				method: "post",
				data:{ staffLoginId:staffLoginId},
				success: function(res){
					res = JSON.parse(res);
					console.log(res.reqId.length == null);
						if (res['result'] == 'success'){
							for(var z=0;z<res.reqId.length;z++)
						      {
						        html += '<div class="row flex" id="row' + res.reqId[z] + '" style="width:90vw;margin-top:1%;display:flex;justify-content:space-around;margin-left:5%;box-shadow:2px 2px 2px 2px rgba(0,0,0,0.16);background-color: white;padding:20px; box-sizing:border-box;">';
						        html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + (z+1) + ".  " + res.timeStamp[z] + '</div>';
						        html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.timeSlot[z] + '</div>';
								html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.pincode[z] + '</div>';
								html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.address[z] + '</div>';
								html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.serviceName[z] + '</div>';
								html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;margin:left:5%;">' + res.serviceCost[z] + '</div>';
								html += '     <button  class="button" onclick="updatePayments(' + res.reqId[z] + ')" style="margin-left:5%;">VERIFY</button>'; 
							    html += '</div>';
						      }
						      $('#staffAcceptedRequests').empty().append(html);
						}
						else if(res['result'] == 'failed')
							window.alert(res['remarks']);
						}
			})
	}
})

function updatePayments(currentReqId){
	$.ajax({
		url: "PHP/updateVerifiedRequests.php",
		method: "post",
		data:{currentReqId:currentReqId},
		success:function(res){
			res = JSON.parse(res);
			if(res['result'] == 'success'){
				window.alert(res['remarks']);
				console.log(res['result'],res['remarks']);
				window.open("staffPaymentsVerification.html","_self");
			}
			else{
				window.alert('Sorry there is some problem!' +"\n" + 'do not worry your money is safe!');
			}
		}
	})
}

//||||||||||||||||||||||||||||||payCurrentRequests()|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function payCurrentRequests(){
	window.open("payBills.html","_self");
}

$(document).ready(function(){
	// console.log(window.location.href.split('/')[4]);
	if(window.location.href.split('/')[4]=="payBills.html"){
		var html = '';
		userLoginId = localStorage.getItem("userLoginId");
		$.ajax({
				url: "PHP/getUserUnpaidRequests.php",
				method: "post",
				data:{ userLoginId:userLoginId},
				success: function(res){
					res = JSON.parse(res);
					console.log(res.reqId.length == null);
					if(res.reqId.length == null){
						html += '<center><div style="box-shadow:2px 2px 2px 2px rgba(0,0,0,0.16);background-color: white;padding:20px; box-sizing:border-box;">No Current Unpaid Bills For You!</div></center>';
					}
					else{

						if (res['result'] == 'success'){
							for(var z=0;z<res.reqId.length;z++)
						      {
						        html += '<div class="row flex" id="row' + res.reqId[z] + '" style="width:90vw;margin-top:1%;display:flex;justify-content:space-around;margin-left:5%;box-shadow:2px 2px 2px 2px rgba(0,0,0,0.16);background-color: white;padding:20px; box-sizing:border-box;">';
						        html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + (z+1) + ".  " + res.timeStamp[z] + '</div>';
						        html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.timeSlot[z] + '</div>';
								html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.pincode[z] + '</div>';
								html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.address[z] + '</div>';
								html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.serviceName[z] + '</div>';
								html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;margin:left:5%;">' + res.serviceCost[z] + '</div>';
								html += '     <button  class="button" onclick="payBills(' + res.reqId[z] + ')" style="margin-left:5%;">PAY</button>'; 
							    html += '</div>';
						      }
						      $('#unpaidBills').empty().append(html);
						}
						else if(res['result'] == 'failed')
							window.alert(res['remarks']);
						}
					}
			})
	}
})

function payBills(currentReqId){
	$.ajax({
		url: "PHP/updateUnpaidRequests.php",
		method: "post",
		data:{currentReqId:currentReqId},
		success:function(res){
			res = JSON.parse(res);
			if(res['result'] == 'success'){
				window.alert('Thanks for your transaction!'+ "\n" +'Hope you liked our service' + "\n" + 'Feel free to contact!');
				console.log(res['result'],res['remarks']);
				window.open("payBills.html","_self");
			}
			else{
				window.alert('Sorry there is some problem!' +"\n" + 'do not worry your money is safe!');
			}
		}
	})
}




////|||||||||||||||||||||||||||||user's previous requests|||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function seePreviousRequest(){
	window.open("previousRequests.html","_self");
}

$(document).ready(function(){
	// console.log(window.location.href.split('/')[4]);
	if(window.location.href.split('/')[4]=="previousRequests.html"){
		var html = '';
		userLoginId = localStorage.getItem("userLoginId");
		$.ajax({
				url: "PHP/getUserRequests.php",
				method: "post",
				data:{ userLoginId:userLoginId},
				success: function(res){
					res = JSON.parse(res);
					//console.log(res['timeStamp'],res['pincode']);
					if (res['result'] == 'success'){
						for(var z=0;z<res.reqId.length;z++)
					      {
					        html += '<div class="row flex" id="row' + res.reqId[z] + '" style="width:90vw;margin-top:1%;display:flex;justify-content:space-around;margin-left:5%;box-shadow:2px 2px 2px 2px rgba(0,0,0,0.16);background-color: white;padding:20px; box-sizing:border-box;">';
					        html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + (z+1) +".         " + res.timeStamp[z] + '</div>';
					        html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.timeSlot[z] + '</div>';
							html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.pincode[z] + '</div>';
							html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.address[z] + '</div>';
							html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.serviceName[z] + '</div>';
							html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.staffName[z] + '</div>';
							html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;margin:left:5%;">' + res.serviceCost[z] + '</div>';
						    html += '</div>';
					      }
					      $('#previousRequests').empty().append(html);
					}
					else if(res['result'] == 'failed')
						window.alert(res['remarks']);
					}
			})
	}
})


function aboutUs(){
	window.open("aboutUsPage.html","_self");
}


function allServicesPage(){
	window.open("allServicesPage.html","_self");
}

function openScheduledPickup(){
	window.open("scheduledPickup.html","_self");
}

function onDemandPickup(){
	window.open("onDemandPickup.html","_self");
}

function recycle(){
	window.open("recycle.html","_self");
}

function userLogin(){
	//window.open("userLogin.html","_self");
}
function adminVerifyStaffs(){
	window.open("adminVerifyStaffs.html","_self");
}

//|||||||||||||||||||||||||||||||||||seeRequestsOfUsers()||||||||||||||||||||||||||||||||||||||||||||||||||||\\
function seeRequestsOfUsers(){
	window.open("appendRequestsToStaffPage.html","_self");
}

$(document).ready(function(){
	if(window.location.href.split('/')[4]=="appendRequestsToStaffPage.html"){
		console.log("GOOD WORK");
		var staffLoginId = localStorage.getItem("staffLoginId");
		console.log(staffLoginId);
		$.ajax({
			url: "PHP/appendRequestsToStaffPage.php",
			method: "post",
			data:{ staffLoginId:staffLoginId },
			success: function(res){
				res = JSON.parse(res);
				if (res['result'] == 'success'){
					var allUserInfo = res.userInfo;
					var allUserId = res.userId;
					var html = '';
					for(i=0;i<allUserId.length;i++){
						var userId   = allUserId[i];
						var userInfo = allUserInfo[userId];
						var name     = userInfo['name'];
						var phoneNumber = userInfo['phoneNumber'];
						html += '<div class="row flex" id="row' + name + '" style="justify-content:space-around;display:flex;width:70vw;margin-top:1%;margin-left:20%;box-shadow:2px 2px 2px 2px rgba(0,0,0,0.16);background-color: white;padding:20px; box-sizing:border-box;">';
						html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + name + '</div>';
						html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;margin:left:5%;">' + phoneNumber + '</div>';
						html += '    <button  class="button" onclick="staffAcceptRequest(' + res.userId[i] + ')" style="margin-left:5%;">ACCEPT</button>';
					    html += '</div>';
						console.log(name);
						console.log(phoneNumber);
					}
					$('#userRequests').empty().append(html);
				}
				else
					window.alert('ERROR');
				}
		})
	}
})
//||||||||||||||||||||||||||||||**********************************||||||||||||||||||||||||||||||||
function staffAcceptRequest(currentUserId){
	console.log(currentUserId);
	var currentStaffId = localStorage.getItem("staffLoginId");
	console.log(currentStaffId);
	$.ajax({
		url: "PHP/updateStaffAllocatedToUserRequest.php",
		method: "post",
		data:{ currentStaffId:currentStaffId, currentUserId:currentUserId },
		success: function(res){
			res = JSON.parse(res);
			if (res['result'] == 'success'){
				console.log('NICE');
				window.alert('successfully accepted the request!!\nGo ahead!!');
				window.open("afterStaffLogin.html","_self");
			}
			else{
				window.alert('ERROR');
			}
		}
	})

}



//||||||||||||||||||||||||||||||||||||onclick="checkPincodeAvailability()"||||||||||||||||||||||||||||||||||||||||||||||||

function checkPincodeAvailability(){
	var count=0;
	var checkPincodeValue = document.getElementById('searchPincodeTextbox').value;

	if(checkPincodeValue.length == 0){
		window.alert('The value cannont be empty!!');
		return;
	}
	else{ 
		var pin = /^[1-9][0-9]{5}$/;
		if(pin.test(checkPincodeValue)){
			count++;
		}
		if(count!=0){
			$.ajax({
					url: "PHP/checkPincodeAvailability.php",
					method: "post",
					data:{ checkPincodeValue:checkPincodeValue },
					success: function(res){
						res = JSON.parse(res);
						console.log(res['count']);
						if (res['result'] == 'success'){
							window.alert('WE FEEL HAPPY TO INFORM YOU THAT WE PROVIDE OUR FACILITY IN YOUR LOCALITY:))\n PRESS OK TO POST REQUEST!!');
						}
						else
							window.alert('WE FEEL SORRY TO INFORM YOU THAT WE DO NOT PROVIDE OUR FACILITY IN YOUR LOCALITY :((');
					}
				})
		}
		else{
			window.alert('INPUT PINCODE IS NOT VALID!!');
		}
	}
}


//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||userSignUp()|||||||||||||||||||||||||||||||||||||||||||||||||||

function userSignUp(){	
	var count = 0;
	var userSignUpEmail    = document.getElementById('userSignUpEmail').value;
	var userSignUpPassword = document.getElementById('userSignUpPassword').value;
	var userSignUpConfirmPassword = document.getElementById('userSignUpConfirmPassword').value;

	if(userSignUpEmail.length == 0 || userSignUpPassword.length == 0 || userSignUpConfirmPassword.length == 0){
    	window.alert('None of the fields can be left empty');
    	return;
    }
    else if(userSignUpPassword != userSignUpConfirmPassword){
    	document.getElementById('userSignUpPassword').value='';
    	document.getElementById('userSignUpConfirmPassword').value='';
    	window.alert('Passwords does not match!!!');
    }
    else{
    	var passw =  /^[A-Za-z]\w{7,14}$/;

		if (passw.test(userSignUpPassword)){
			count++;
			console.log(userSignUpPassword);
		}
		else
			window.alert("Input Password id not valid!!!\nPassword should have at least one small character one capital character and one digit and should be between 7 to 14 characters long!");

    	var email  = /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
    	
    	if(email.test(userSignUpEmail)){
    		count++;
			console.log(userSignUpEmail)
    		
    	}
		else{
			window.alert("Input Email address id not valid!!!\nYour Email should have characters followed by . then @XXXX.com!\n ex: abc.123@gmail.com");
		}

		if(count == 2){
			$.ajax({
				url: "PHP/userSignUp.php",
				method: "post",
				data:{ userSignUpEmail:userSignUpEmail, userSignUpPassword:userSignUpPassword},
				success: function(res){
					res = JSON.parse(res);
					console.log(res['id']);
					userSignUpId = res['id'];
					if (res['result'] == 'success'){
						window.alert('Congratulations you have successfully signed in!!\n Press OK to log in!!');
						window.open("userLogin.html","_self");
					}
					else
						window.alert('ERROR!');
				}
			})
		}
		else
			window.alert('ERROR!!');

}

}


/////////////////////////////////////////////////////userLogin()///////////////////////////////////////////////////////////

function userLogin(){
	var count = 0;
	var userEmailLogin    = document.getElementById('userEmailLogin').value;
	var userPasswordLogin = document.getElementById('userPasswordLogin').value;

	if(userEmailLogin.length == 0 || userPasswordLogin.length == 0){
    	window.alert('None of the fields can be left empty');
    	return;
    }
    else{

		var regx  = /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
		var passw =  /^[A-Za-z]\w{7,14}$/;

		if(regx.test(userEmailLogin)){
			count++;
			console.log(userEmailLogin)
		}
		else
			window.alert("Input Email address id not valid!!!\nPlease type the correct email address to login!");

		if (passw.test(userPasswordLogin)) {
			count++;
			console.log(userPasswordLogin);
		}
		else
			window.alert("Input Password id not valid!!!\nPlease type the correct Password to login!");

		if(count==2){

			$.ajax({
				url: "PHP/afterUserLogin.php",
				method: "post",
				data:{ userEmailLogin:userEmailLogin, userPasswordLogin:userPasswordLogin},
				success: function(res){
					res = JSON.parse(res);
					console.log(res['result']);
					console.log(res['remarks']);
					userLoginId = res['userIdAfterLogin'];
					localStorage.setItem("userLoginId",userLoginId);
					console.log(userLoginId);
					if (res['result'] == 'success'){
						window.open("userAfterLogin.html","_self");
						window.alert(res['remarks']);
					}
					else if(res['result'] == 'failed')
						window.alert(res['remarks']);
					}
			})
		}
}
}

////////////////////////////////////////////////////checkUserProfileUpdate()/////////////////////////////////////////////////

function userProfileUpdate(){
	userLoginId = localStorage.getItem("userLoginId");
	console.log(userLoginId);
	$.ajax({
  		url: "PHP/checkUserInfo.php",
  		method: "POST",
  		data:{ userLoginId:userLoginId },
  		success: function(res){
			res = JSON.parse(res);
			if (res['result'] == 'success'){
				window.alert('You have alredy successfully Updated the details!!\n Press OK to Browse!!');
				window.open("userAfterLogin.html","_self");
			}
			else{
				window.open("userProfileUpdate.html","_self");
			}
		}
	})
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function staffProfileUpdate(){
	staffLoginId = localStorage.getItem("staffLoginId");
	// console.log(staffLoginId);
	$.ajax({
  		url: "PHP/checkStaffInfo.php",
  		method: "POST",
  		data:{ staffLoginId:staffLoginId },
  		success: function(res){
			res = JSON.parse(res);
			if (res['result'] == 'success'){
				window.alert('You have alredy successfully Updated the details!!\n Press OK to Browse!!');
				window.open("afterStaffLogin.html","_self");
			}
			else{
				window.open("staffProfileUpdate.html","_self");
			}
		}
	})
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function adminProfileUpdate(){
	adminLoginId = localStorage.getItem("adminLoginId");
	$.ajax({
  		url: "PHP/checkAdminInfo.php",
  		method: "POST",
  		data:{ adminLoginId:adminLoginId },
  		success: function(res){
			res = JSON.parse(res);
			if (res['result'] == 'success'){
				window.alert('You have already successfully Updated the details!!\n Press OK to Browse!!');
				window.open("afterAdminLogin.html","_self");
			}
			else{
			window.open("adminProfileUpdate.html","_self");
			}
		}
	})
}

///////////////////////////////////////////////////////userPostRequest()////////////////////////////////////////////////

function userPostRequest(){
	window.open("userRequest.html","_self");
}


///////////////////////////////////////////saveUserUpdateInfo()////////////////////////////////////////////////////////
function saveUserUpdateInfo(){
	var count =0;
	userLoginId = localStorage.getItem("userLoginId");
	var userFullName    = document.getElementById('userFullName').value;
	var userPhoneNumber = document.getElementById('userPhoneNumber').value;
	if(userFullName.length == 0 || userPhoneNumber.length == 0){
    	window.alert('None of the fields can be left empty');
    	return;
	}
  	else{
		var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		var name    = /^[a-zA-Z ]+$/;
  		if(phoneno.test(userPhoneNumber)){
  			count++;
  			console.log(userPhoneNumber);
  		}
  		else{
  			window.alert('Entered Phone Number is not valid!!');
  		}
  		if(name.test(userFullName)){
  			count++;
  			console.log(userFullName);
  			console.log(count);
  			console.log(userLoginId);
  		}
  		else{
  			window.alert('Entered Name is not valid!!');	
  		}
  		if(count == 2){
  			$.ajax({
  				url: "PHP/userUpdateInfo.php",
  				method: "POST",
  				data:{ userFullName:userFullName, userPhoneNumber:userPhoneNumber, userLoginId:userLoginId},
  				success: function(res){
					res = JSON.parse(res);
					console.log(res['userFullName']);
					if (res['result'] == 'success'){
						window.alert('Congratulations you have successfully filled in the details!!\n Press OK to Browse!!');
						window.open("userAfterLogin.html","_self");
					}
					else
						window.alert('ERROR!');
				}
  			})
  		}
  	}
}
///////////////////////////////////////////saveUserUpdateInfo()////////////////////////////////////////////////////////

function saveStaffUpdateInfo(){
	var count =0;
	staffLoginId = localStorage.getItem("staffLoginId");
	var staffFullName    = document.getElementById('staffFullName').value;
	var staffPhoneNumber = document.getElementById('staffPhoneNumber').value;
	if(staffFullName.length == 0 || staffPhoneNumber.length == 0){
    	window.alert('None of the fields can be left empty');
    	return;
	}
  	else{
		var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		var name    = /^[a-zA-Z ]+$/;
  		if(phoneno.test(staffPhoneNumber)){
  			count++;
  			console.log(staffPhoneNumber);
  		}
  		else{
  			window.alert('Entered Phone Number is not valid!!');
  		}
  		if(name.test(staffFullName)){
  			count++;
  			console.log(staffFullName);
  			console.log(count);
  			console.log(staffLoginId);
  		}
  		else{
  			window.alert('Entered Name is not valid!!');	
  		}
  		if(count == 2){
  			$.ajax({
  				url: "PHP/staffUpdateInfo.php",
  				method: "POST",
  				data:{ staffFullName:staffFullName, staffPhoneNumber:staffPhoneNumber, staffLoginId:staffLoginId},
  				success: function(res){
					res = JSON.parse(res);
					console.log(res['staffFullName']);
					if (res['result'] == 'success'){
						window.alert('Congratulations you have successfully filled in the details!!\n Press OK to Browse!!');
						window.open("afterStaffLogin.html","_self");
					}
					else
						window.alert('ERROR!');
				}
  			})
  		}
  	}
}
///////////////////////////////////////////saveAdminUpdateInfo()////////////////////////////////////////////////////////

function saveAdminUpdateInfo(){
	var count =0;
	adminLoginId = localStorage.getItem("adminLoginId");
	console.log(adminLoginId);
	var adminFullName    = document.getElementById('adminFullName').value;
	var adminPhoneNumber = document.getElementById('adminPhoneNumber').value;
	if(adminFullName.length == 0 || adminPhoneNumber.length == 0){
    	window.alert('None of the fields can be left empty');
    	return;
	}
  	else{
		var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		var name    = /^[a-zA-Z ]+$/;
  		if(phoneno.test(adminPhoneNumber)){
  			count++;
  			console.log(adminPhoneNumber);
  		}
  		else{
  			window.alert('Entered Phone Number is not valid!!');
  		}
  		if(name.test(adminFullName)){
  			count++;
  			console.log(adminFullName);
  			console.log(count);
  			console.log(adminLoginId);
  		}
  		else{
  			window.alert('Entered Name is not valid!!');	
  		}
  		if(count == 2){
  			$.ajax({
  				url: "PHP/adminUpdateInfo.php",
  				method: "POST",
  				data:{ adminFullName:adminFullName, adminPhoneNumber:adminPhoneNumber, adminLoginId:adminLoginId},
  				success: function(res){
					res = JSON.parse(res);
					console.log(res['adminFullName']);
					if (res['result'] == 'success'){
						window.alert('Congratulations you have successfully filled in the details!!\n Press OK to Browse!!');
						window.open("afterAdminLogin.html","_self");
					}
					else
						window.alert('ERROR!');
				}
  			})
  		}
  	}
}

////////////////////////////////////////////////////staffSignUp()///////////////////////////////////////////////////////

function staffSignUp(){
	var count = 0;
	var staffSignUpEmail    = document.getElementById('staffSignUpEmail').value;
	var staffSignUpPassword = document.getElementById('staffSignUpPassword').value;
	var staffSignUpConfirmPassword = document.getElementById('staffSignUpConfirmPassword').value;

	if(staffSignUpEmail.length == 0 || staffSignUpPassword.length == 0 || staffSignUpConfirmPassword.length == 0){
    	window.alert('None of the fields can be left empty');
    	return;
    }
    else if(staffSignUpPassword != staffSignUpConfirmPassword){
    	document.getElementById('staffSignUpPassword').value='';
    	document.getElementById('staffSignUpConfirmPassword').value='';
    	window.alert('Passwords does not match!!!');
    }
    else{
    	var passw =  /^[A-Za-z]\w{7,14}$/;

		if (passw.test(staffSignUpPassword)){
			count++;
			console.log(staffSignUpPassword);
		}
		else
			window.alert("Input Password id not valid!!!\nPassword should have at least one small character one capital character and one digit and should be between 7 to 14 characters long!");

    	var email  = /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
    	
    	if(email.test(staffSignUpEmail)){
    		count++;
			console.log(staffSignUpEmail)
    		
    	}
		else{
			window.alert("Input Email address id not valid!!!\nYour Email should have characters followed by . then @XXXX.com!\n ex: abc.123@gmail.com");
		}

		if(count == 2){
			$.ajax({
				url: "PHP/staffSignUp.php",
				method: "post",
				data:{ staffSignUpEmail:staffSignUpEmail, staffSignUpPassword:staffSignUpPassword},
				success: function(res){
					res = JSON.parse(res);
					console.log(res['id']);
					staffSignUpId = res['id'];
					if (res['result'] == 'success'){
						window.alert('Congratulations you have successfully signed in!!\n Press OK to log in!!');
						window.open("staffLogin.html","_self");
					}
					else
						window.alert('ERROR!');
				}
			})
		}
		else
			window.alert('ERROR!!');

}

}

////////////////////////////////////////////////////////staffLogin()///////////////////////////////////////////////////////

function staffLogin(){
	var count = 0;
	var staffEmailLogin    = document.getElementById('staffEmailLogin').value;
	var staffPasswordLogin = document.getElementById('staffPasswordLogin').value;

	if(staffEmailLogin.length == 0 || staffPasswordLogin.length == 0){
    	window.alert('None of the fields can be left empty');
    	return;
    }
    else{

		var regx  = /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
		var passw =  /^[A-Za-z]\w{7,14}$/;

		if(regx.test(staffEmailLogin)){
			count++;
			console.log(staffEmailLogin)
		}
		else
			window.alert("Input Email address id not valid!!!\nPlease type the correct email address to login!");

		if (passw.test(staffPasswordLogin)) {
			count++;
			console.log(staffPasswordLogin)
		}
		else
			window.alert("Input Password id not valid!!!\nPlease type the correct Password to login!");

		if(count==2){

			$.ajax({
				url: "PHP/afterStaffLogin.php",
				method: "post",
				data:{ staffEmailLogin:staffEmailLogin, staffPasswordLogin:staffPasswordLogin},
				success: function(res){
					res = JSON.parse(res);
					console.log(res['result']);
					console.log(res['remarks']);
					console.log(res['staffIdAfterLogin']);
					staffLoginId = res['staffIdAfterLogin'];
					localStorage.setItem("staffLoginId",staffLoginId);
					console.log(userLoginId);
					if (res['result'] == 'success'){
						window.open("afterStaffLogin.html","_self");
						window.alert(res['remarks']);
					}
					else if(res['result'] == 'failed')
						window.alert(res['NoSuchEmail']);
						window.alert(res['remarks']);
					}
			})
		}
}
}

////////////////////////////////////////////////////adminSignUp()///////////////////////////////////////////////////////

function adminSignUp(){
	var count = 0;
	var adminSignUpEmail    = document.getElementById('adminSignUpEmail').value;
	var adminSignUpPassword = document.getElementById('adminSignUpPassword').value;
	var adminSignUpConfirmPassword = document.getElementById('adminSignUpConfirmPassword').value;

	if(adminSignUpEmail.length == 0 || adminSignUpPassword.length == 0 || adminSignUpConfirmPassword.length == 0){
    	window.alert('None of the fields can be left empty');
    	return;
    }
    else if(adminSignUpPassword != adminSignUpConfirmPassword){
    	document.getElementById('adminSignUpPassword').value='';
    	document.getElementById('adminSignUpConfirmPassword').value='';
    	window.alert('Passwords does not match!!!');
    }
    else{
    	var passw =  /^[A-Za-z]\w{7,14}$/;

		if (passw.test(adminSignUpPassword)){
			count++;
			console.log(adminSignUpPassword);
		}
		else
			window.alert("Input Password id not valid!!!\nPassword should have at least one small character one capital character and one digit and should be between 7 to 14 characters long!");

    	var email  = /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
    	
    	if(email.test(adminSignUpEmail)){
    		count++;
			console.log(adminSignUpEmail)
    		
    	}
		else{
			window.alert("Input Email address id not valid!!!\nYour Email should have characters followed by . then @XXXX.com!\n ex: abc.123@gmail.com");
		}

		if(count == 2){
			$.ajax({
				url: "PHP/adminSignUp.php",
				method: "post",
				data:{ adminSignUpEmail:adminSignUpEmail, adminSignUpPassword:adminSignUpPassword},
				success: function(res){
					res = JSON.parse(res);
					console.log(res['id']);
					adminSignUpId = res['id'];
					if (res['result'] == 'success'){
						window.alert('Congratulations you have successfully signed in!!\n Press OK to log in!!');
						window.open("adminLogin.html","_self");
					}
					else
						window.alert('ERROR!');
				}
			})
		}
		else
			window.alert('ERROR!!');

}

}

////////////////////////////////////////////////////adminLogin()////////////////////////////////////////////////////////////

function adminLogin(){
	var count = 0;
	var adminEmailLogin    = document.getElementById('adminEmailLogin').value;
	var adminPasswordLogin = document.getElementById('adminPasswordLogin').value;

	if(adminEmailLogin.length == 0 || adminPasswordLogin.length == 0){
    	window.alert('None of the fields can be left empty');
    	return;
    }
    else{

		var regx  = /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
		var passw =  /^[A-Za-z]\w{7,14}$/;

		if(regx.test(adminEmailLogin)){
			count++;
			console.log(adminEmailLogin)
		}
		else
			window.alert("Input Email address id not valid!!!\nPlease type the correct email address to login!");

		if (passw.test(adminPasswordLogin)) {
			count++;
			console.log(adminPasswordLogin)
		}
		else
			window.alert("Input Password id not valid!!!\nPlease type the correct Password to login!");

		if(count==2){

			$.ajax({
				url: "PHP/afterAdminLogin.php",
				method: "post",
				data:{ adminEmailLogin:adminEmailLogin, adminPasswordLogin:adminPasswordLogin},
				success: function(res){
					res = JSON.parse(res);
					console.log(res['result']);
					console.log(res['remarks']);
					console.log(res['adminIdAfterLogin']);
					adminLoginId = res['adminIdAfterLogin'];
					localStorage.setItem("adminLoginId",adminLoginId);

					if (res['result'] == 'success'){
						window.open("afterAdminLogin.html","_self");
						window.alert(res['remarks']);
					}
					else if(res['result'] == 'failed')
						window.alert(res['NoSuchEmail']);
						window.alert(res['remarks']);
					}
			})
		}
}
}


/////////////////////////////////////////////////

function submitContactForm(){
	var name = $('#name').val();
	var email = $('#email').val();
	var msg = $('#msg').val();

	if(msg.length <=0 || email.length<=0 || name.length<=0){
		alert('None of the fields can be left empty');
		return;
	}
	else{

		$.ajax({
			url: "PHP/contact-us.php",
			method: "POST",
			data:{ name:name, email:email, msg:msg },
			success: function(res){
				res = JSON.parse(res);
				if(res['result'] == 'success'){
					window.alert('Your message has successfully been received\nWe will reach to you as soon as possible!');
					window.open("index.html","_self");
				}
				else{
					alert('ERROR');
				}
			}

		});
	}
}