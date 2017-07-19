
function ConfirmRecruiters(){


var x = $(location).attr('search');




var details;
  var pushId=x.substr(1);
var uid;

   var JobDetailsref = firebase.database().ref('recruitments/'+pushId);
   var confirmRecruiters=firebase.database().ref('Confirmed Recruitments/');
   var postedRecruitments=firebase.database().ref('recruitments');

    var employerRecruitments=firebase.database().ref('Employer Recruitments');
    var confirmedEmployerRecruitments=firebase.database().ref('Confirmed Employer Recruitments');
      
  JobDetailsref.once("value",function(snapshot){
  
  	details=snapshot.val();
 
    uid=details.uid;


   firebase.database().ref('Confirmed Recruitments/'+pushId).set(details);
   confirmedEmployerRecruitments.child(uid+'/'+pushId).set(details);
   var employer=firebase.database().ref('Employers/'+uid);

     count(employer);
     count(confirmRecruiters);
     countMinus(employer);
     countMinus(postedRecruitments);



  setTimeout(function(){
     employerRecruitments.child(uid+'/'+pushId).remove().then(function(){
       JobDetailsref.remove().then(function(){

   
       location.href="main.html";
  alert("Successfully Confirmed");
  return;
});
 
});

    },3200); 
  });





  
}

   function count(postRef){
    
    postRef.child('confirmedRecruitmentCount').transaction(function(current) {
    // Increment readCount by 1, or set to 1 if it was undefined before.
    return (current || 0) + 1;
  }, function(error, committed, snapshot) {
    if (error) {
      // The fetch succeeded, but the update failed.
      console.error(error);
    } 
  });
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