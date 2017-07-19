






function RemoveRecruiters(){


  var x = $(location).attr('search');

  var details;
  var pushId=x.substr(1);

   var confirmRecruiters=firebase.database().ref('Confirmed Recruitments/'+pushId);

   confirmRecruiters.once('value',function(snapshot){

   	var details=snapshot.val();
   	
   	if(details==null || details ==""){
   		location.href="main.html";
   		return;
   	}

   	var currentUID=details.uid;
   
   var ConfirmedJobDetailsrefs =firebase.database().ref('Confirmed Employer Recruitments/'+ currentUID+'/'+ pushId);
   var totalCountRef=firebase.database().ref('Confirmed Recruitments/');
   var countRef=firebase.database().ref('Employers/'+currentUID);



   confirmRecruiters.remove().then(function(){

    countMinusConfirm(totalCountRef);
    countMinusConfirm(countRef);

	ConfirmedJobDetailsrefs.remove().then(function(){
		
		location.href="main.html";
        alert("Successfully Removed");
	});
  
});



 })

    


 
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