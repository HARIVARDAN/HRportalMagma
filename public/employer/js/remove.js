


function RemoveRecruiters(){

var x = $(location).attr('search');

var details;
  var pushId=x.substr(1);
  var ref1 = firebase.database().ref('recruitments/');
 var ref2 = firebase.database().ref('Confirmed Recruitments/');
   ref1.once('value', function(snapshot) {
  if (snapshot.hasChild(pushId))
  {
      RemovePostedRecruiters();
}
else{
	    ref2.once('value', function(snapshot) {
  if (snapshot.hasChild(pushId))
  {
     RemoveCofirmedRecruiters();
	   }
	   else{
	   	location.href="../home.html";
	   }

});
}
});
}
  function RemovePostedRecruiters(){


var x = $(location).attr('search');

var details;
  var pushId=x.substr(1);

 setTimeout(function(){ 
console.log(currentUID);
var user = firebase.auth().currentUser;
console.log(user);
console.log(user.uid);
   var JobDetailsref = firebase.database().ref('recruitments/'+pushId);
   var JobDetailsrefs =firebase.database().ref('/Employer Recruitments/' + currentUID + '/' + pushId);

   var totalCountRef=firebase.database().ref('recruitments/');
   var countRef=employers.child(currentUID);
JobDetailsref.remove().then(function(){
countMinus(totalCountRef);
countMinus(countRef);
	JobDetailsrefs.remove().then(function(){
		
		
  	$('#modal-text').text("Successfullly Removed.");
        $("#modal_alert").modal({backdrop: true});
  
     window.history.back();
    });	

    	
}),function(error){
	 $('#modal-text').text("Error : "+error +" Occured.");
        $("#modal_alert").modal({backdrop: true});
}

 },2000);
}



  function RemoveCofirmedRecruiters(){


var x = $(location).attr('search');

var details;
  var pushId=x.substr(1);

 setTimeout(function(){ 

   var ConfirmedJobDetailsref = firebase.database().ref('Confirmed Recruitments/'+pushId);
   var ConfirmedJobDetailsrefs =firebase.database().ref('Confirmed Employer Recruitments/'+ currentUID+'/'+ pushId);




   var totalCountRef=firebase.database().ref('Confirmed Recruitments/');
   var countRef=employers.child(currentUID);
ConfirmedJobDetailsref.remove().then(function(){
countMinusConfirm(totalCountRef);
countMinusConfirm(countRef);
	ConfirmedJobDetailsrefs.remove().then(function(){
		
		
  	$('#modal-text').text("Successfullly Removed.");
        $("#modal_alert").modal({backdrop: true});
  
     window.history.back();
    });	

    	
}),function(error){
	 $('#modal-text').text("Error : "+error +" Occured.");
        $("#modal_alert").modal({backdrop: true});
}

 },2000);
}



 function countMinus(postRef){
    
    postRef.child('recruitmentCount').transaction(function(current) {
    	console.log(current);
    // Increment readCount by 1, or set to 1 if it was undefined before.
    return (current - 1);
  }, function(error, committed, snapshot) {
    if (error) {
      // The fetch succeeded, but the update failed.
      console.error(error);
    } 
  });
  }

  function countMinusConfirm(postRef){
    
    postRef.child('confirmedRecruitmentCount').transaction(function(current) {
    	console.log(current);
    // Increment readCount by 1, or set to 1 if it was undefined before.
    return (current - 1);
  }, function(error, committed, snapshot) {
    if (error) {
      // The fetch succeeded, but the update failed.
      console.error(error);
    } 
  });
  }