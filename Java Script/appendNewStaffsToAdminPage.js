
$(document).ready(function(){
	console.log(window.location.href.split('/')[4]);
	if(window.location.href.split('/')[4]=="adminVerifyStaffs.html"){
		var html = '';
		$.ajax({
				url: "PHP/appendNewStaffsToAdminPage.php",
				method: "post",
				data:{ },
				success: function(res){
					res = JSON.parse(res);
					console.log(res['staffEmail']);
					if (res['result'] == 'success'){
					    for(var z=0;z<res.staffEmail.length;z++)
					      {
					         html += '<div class="row" id="row' + res.id[z] + '" style="width:90vw;margin-top:1%;margin-left:5%;box-shadow:2px 2px 2px 2px rgba(0,0,0,0.16);background-color: white;padding:20px; box-sizing:border-box;">';
					         html += '   <div style="color:green;font-weight:bold;font-size:12pt;margin-bottom: 15px;">' + res.staffEmail[z] + '</div>';
					         html += '   <div class="row" style="display:flex;justify-content:space-around;padding-left: 20px;box-sizing:border-box;">';
					         html += '		 <div class="timeSlot">';
					         html += '			  <span class="span">Time Slot:</span>';
					         html += '       	  <input type="radio" name="timeslot_' + res.id[z] + '" value="6-9">6-9';
					         html += '       	  <input type="radio" name="timeslot_' + res.id[z] + '" value="9-12">9-12';
					         html += ' 		      <input type="radio" name="timeslot_' + res.id[z] + '" value="15-18">15-18';
					         html += ' 		      <input type="radio" name="timeslot_' + res.id[z] + '" value="18-21">18-21';
					         html += '		 </div>';
					         html += '		 <div>';
					         html += ' 		 	<span class="span">Pincode:</span><input type="text" placeholder="Enter pincode" id="pincode_' + res.id[z] + '" maxlength="7"' + res.id[z] + '" >';
					         html += '		 </div>';
					         html += '		 <div>';
					         html += ' 		 	<span class="span">Vehicle no:</span><input type="text" placeholder="Enter Vehicle number" id="vehicleNumber_' + res.id[z] + '" maxlength="3"' + res.id[z] + '">';
					         html += '		 </div>';
					         html += '     <button  class="button" onclick="allotTimeAndSectorToNewStaff(' + res.id[z] + ')" style="margin-left:5%;">Save</button>';
					         html += '   </div>';
					         html += '</div>';
					      }
					      $('#staffNames').empty().append(html);
					}
					else if(res['result'] == 'failed')
						window.alert(res['remarks']);
					}
			})
	}
})

function allotTimeAndSectorToNewStaff(currentStaffId){
	var count=0;var k=0;
	var pincodeAllotedByAdmin        = document.getElementById('pincode_' + currentStaffId).value;
	var vehicleNumberAllotedByAdmin  = document.getElementById('vehicleNumber_' + currentStaffId).value;
	var timeSlot = '';
    $("input[name='timeslot_" + currentStaffId + "']").each( function () {
       if ($(this).prop('checked')==true){
          timeSlot = $(this).val();
       }
    });

	console.log('timeslot' + timeSlot);
	if(pincodeAllotedByAdmin.length == 0 || vehicleNumberAllotedByAdmin.length == 0 || !timeSlot){
		window.alert('None of the fields can be left empty');
	}
	else{
		var pin = /^[1-9][0-9]{5}$/;
		var vehNo = /^[0-9]{3}$/;
		if(vehNo.test(vehicleNumberAllotedByAdmin)){
			count++;
			console.log(vehicleNumberAllotedByAdmin);
		}
		else{
			window.alert('INVALID VEHICLE NUMBER!!');
		}
		if(pin.test(pincodeAllotedByAdmin)){
			count++;
			$.ajax({
					url: "PHP/checkPincodeAvailabilityAllotedByAdmin.php",
					method: "post",
					data:{ pincodeAllotedByAdmin:pincodeAllotedByAdmin },
					// async:false,
					success: function(res){
						res = JSON.parse(res);
						// console.log(res['count']);
						if (res['result'] == 'success'){
							$.ajax({
			  				url: "PHP/staffUpdateInfoByAdmins.php",
			  				method: "POST",
			  				data:{ pincodeAllotedByAdmin:pincodeAllotedByAdmin, vehicleNumberAllotedByAdmin:vehicleNumberAllotedByAdmin, timeSlot:timeSlot, currentStaffId,currentStaffId},
			  				success: function(res){
								res = JSON.parse(res);
								console.log(res['pincodeAllotedByAdmin']==null);
								if (res['result'] == 'success' && count ==2){
									window.alert('Congratulations you have successfully added the details to the staff!!\n Press OK to Browse!!');
									window.open("afterAdminLogin.html","_self");
								}
								else
									window.alert('ERROR!');
							}
			  			})
						}
						else
							window.alert('THIS PINCODE DOES NOT EXISTS');
					}
				})
		}
		else{
			window.alert('INVALID PINCODE!!');
		}
	}
}