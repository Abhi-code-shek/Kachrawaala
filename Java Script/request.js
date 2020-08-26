var serviceName;

function submitRequest(){
	var count=0;
	var houseName = document.getElementById('houseName').value;
	var checkPincodeValue = document.getElementById('requestPincode').value;
	var requestArea;
	var timeSlot = '';
    $("input[name='timeslot']").each( function () {
       if ($(this).prop('checked')==true){
          timeSlot = $(this).val();
       }
    });
    console.log(timeSlot);
	if(checkPincodeValue.length == 0 || !timeSlot){
		window.alert('None of the values cannont be empty!!');
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
							requestArea = res['requestArea'];
							console.log(requestArea);
							var areaCorrespondingToThePincode = res['requestArea'];
							var userLoginId = localStorage.getItem("userLoginId");
							var serviceName = localStorage.getItem("serviceName");
							console.log(userLoginId);
							console.log(serviceName);
							$.ajax({
								url: "PHP/userPostRequest.php",
								method: "post",
								data:{ houseName:houseName, checkPincodeValue:checkPincodeValue, timeSlot:timeSlot, areaCorrespondingToThePincode:areaCorrespondingToThePincode, userLoginId:userLoginId, serviceName:serviceName},
								success: function(res){
									res = JSON.parse(res);
									if (res['result'] == 'success'){
										window.alert('Congratulations you have successfully posted a request!!\n Press OK to log in!!');
										window.open("userAfterLogin.html","_self");
									}
									else
										window.alert('ERROR!');
								}
							})
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
function userPostRequest1(){
	localStorage.setItem("serviceName","RESIDENTIAL CURBSIDE PICKUP");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
////////////////////////////////////////////////////
function userPostRequest2(){
	localStorage.setItem("serviceName","BUSINESS WASTE PICKUP");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
////////////////////////////////////////////////////
function userPostRequest3(){
	localStorage.setItem("serviceName","RECYCLING PICKUP");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
////////////////////////////////////////////////////
function userPostRequest4(){
	localStorage.setItem("serviceName","YARD WASTE");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
////////////////////////////////////////////////////
function userPostRequest5(){
	localStorage.setItem("serviceName","LARGE TRASH PICKUP");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
////////////////////////////////////////////////////
function userPostRequest6(){
	localStorage.setItem("serviceName","TEMPORARY DUMPSTER RENTAL");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
///////////////////////////////////////////////////
function userPostRequest7(){
	localStorage.setItem("serviceName","BAGSTER BAG");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
////////////////////////////////////////////////////
function userPostRequest9(){
	localStorage.setItem("serviceName","BULBS, BATTERIES, ELECTRONICS");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
////////////////////////////////////////////////////
function userPostRequest10(){
	localStorage.setItem("serviceName","HOUSEHOLD HAZARDOUS WASTE");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
////////////////////////////////////////////////////
function userPostRequest11(){
	localStorage.setItem("serviceName","SUSTAINABILITY WITH WASTE MANAGEMENT");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})
////////////////////////////////////////////////////
function userPostRequest12(){
	localStorage.setItem("serviceName","FOOD AND ORGANIC RECYCLING");
	console.log(localStorage.getItem("serviceName"));
	window.open("userRequest.html","_self");
	
}
$(document).ready(function(){
	if(window.location.href.split('/')[4]=="userRequest.html"){
		console.log(localStorage.getItem("serviceName"));
		serviceName = localStorage.getItem("serviceName");
		document.getElementById('serviceName').value = serviceName;
	}
})

// // $(document).ready(function(){
// // 	console.log(window.location.href.split('/')[4]);
// // 	if(window.location.href.split('/')[4]=="userRequest.html"){
// // 		// window.alert('Do you want to post location for your current location??\nIf yes click then the current location button!!');
		
// 		var x = document.getElementById("demo");

// 		function getLocation() {
// 			if (navigator.geolocation) {
// 		    navigator.geolocation.getCurrentPosition(showPosition);
// 		  }
// 		  	else { 
// 		    	x.innerHTML = "Geolocation is not supported by this browser.";
// 		  	}
// 		}

// 		function showPosition(position) {
// 		  window.alert("Latitude: " + position.coords.latitude +"  Longitude: " + position.coords.longitude);
// 		}



// // 	}
// // })

// // function initMap() {
// //   var map = new google.maps.Map(document.getElementById('map'), {
// //     zoom: 8,
// //     center: {lat: 40.731, lng: -73.997}
// //   });
// //   var geocoder = new google.maps.Geocoder;
// //   var infowindow = new google.maps.InfoWindow;

// //   document.getElementById('submit').addEventListener('click', function() {
// //     geocodeLatLng(geocoder, map, infowindow);
// //   });
// // }

// // function geocodeLatLng(geocoder, map, infowindow) {
// //   var input = document.getElementById('latlng').value;
// //   var latlngStr = input.split(',', 2);
// //   var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
// //   geocoder.geocode({'location': latlng}, function(results, status) {
// //     if (status === 'OK') {
// //       if (results[0]) {
// //         map.setZoom(11);
// //         var marker = new google.maps.Marker({
// //           position: latlng,
// //           map: map
// //         });
// //         infowindow.setContent(results[0].formatted_address);
// //         infowindow.open(map, marker);
// //       } else {
// //         window.alert('No results found');
// //       }
// //     } else {
// //       window.alert('Geocoder failed due to: ' + status);
// //     }
// //   });
// // }