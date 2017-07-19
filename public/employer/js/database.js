var currentUID;
var key;
var config = {
  apiKey: "AIzaSyBWhSdFyk14MFyqdPfv8148flACw1gCzTY",
    authDomain: "jcr-hr-solutions.firebaseapp.com",
    databaseURL: "https://jcr-hr-solutions.firebaseio.com",
    projectId: "jcr-hr-solutions",
    storageBucket: "jcr-hr-solutions.appspot.com",
    messagingSenderId: "951267740259"
  };

    var employerApp=firebase.initializeApp(config);
    var Auth = employerApp.auth();
    var database= employerApp.database();
    var databaseRef = database.ref();
    var employers=databaseRef.child('Employers');
    var employerRecruitments=databaseRef.child('Employer Recruitments');
    var confirmedEmployerRecruitments=databaseRef.child('Confirmed Employer Recruitments');
    var applications=databaseRef.child('Employer Applications/');
    var UserApplications=databaseRef.child('User Applications');
    var Totalapplications=databaseRef.child('Applications');
    var casecompetitions=databaseRef.child('Case Competitions');
    var employerCasecompetitions = databaseRef.child('Employer Case Competitions');
    var categoryCasecompetitions = databaseRef.child('Category Case Competitions');

    var userProfile;

  var language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

 var recruitment_details = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

   var userProfile;

 
  
	class tempProfile {
  constructor(profile) {
    this.profile=profile;
  }
  
  get profile() {
    return this.profile;
  }
  set set_profile(profile){
  	this.profile=profile;
  }
}
  
function getDate(timeStamp){
    
    var d=new Date(timeStamp);
    var date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    return date;

}

function getTime(timeStamp){

  var date = new Date(timeStamp);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

return formattedTime;

}

$(document).ready(function(){
	firebase.auth().onAuthStateChanged(onAuthStateChanged);

  $('#case-competition').click(function(){
    location.href="casecompetitions.html";
  });

	$('#signout').click(function(){
		firebase.auth().signOut();
		location.href="../";
	});
		$('#signout1').click(function(){
		firebase.auth().signOut();
		location.href="../";
	});

	
});

 function validateEmail(email)

 {
    var x = email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
       
     $('#modal-text').text("Please enter a valid Email Id");
        $("#modal_alert").modal({backdrop: true});
        return false;
    }
    else
      return true;
}



 function validatePhone(inputtxt)  

{  
  var phoneno = /^\d{10}$/;  
  if(inputtxt.match(phoneno))    
    {  return true;    }
      else  
        {  
        $('#modal-text').text("Please enter a valid Phone Number");
        $("#modal_alert").modal({backdrop: true});
        return false;  
      }
}  





   function onAuthStateChanged(user) {
  // We ignore token refresh events.
var pathname=window.location.pathname;

  if (user && currentUID === user.uid) {

   employers.once('value', function(snapshot) {
  if (snapshot.hasChild(currentUID))
  {
      

  	if(pathname=="/employer/signup.html" || pathname=="/employer/login.html"){
        location.href="home.html";
        return;
      }
     var p=snapshot.val();

     userProfile=p[currentUID]; 
      key=currentUID;

  login();
  setdetails(user,userProfile);
 
    return;
}
else{
	location.href="../";
}
 });
}

 else if (user) {
 	currentUID = user.uid;


employers.once('value', function(snapshot) {
  if (snapshot.hasChild(currentUID))
  {
  
    
   if(!user.emailVerified ){
     
     $("#modal_process").modal('hide');
     $('#modal-text').text('A verification email is sent to your ' + user.email + ' mail.Please check your mail to activate your Account');
     $("#modal_alert").modal({backdrop: true});
        firebase.auth().signOut();

        return;
      }
 
  else{ 
      currentUID = user.uid;
       var pathname = window.location.pathname;
       var p=snapshot.val();

     userProfile=p[currentUID]; 
       login();
       setdetails(user,userProfile);

     if(pathname=="/employer/signup.html" || pathname=="/employer/login.html"){
       location.href="home.html";
        return;
      }

    }
   	
 }
  else{

  	if(language.log=="" || language.log==null){

        location.href="../";
  	}
  	else{
  	saveProfile(language.log);

 	$("#modal_process").modal('hide');
     }
  }
     
}),function(error){

  alert(error);
};
}
   else {
    // Set currentUID to null.
    currentUID = null;
    logout();
   
 	if(pathname!="/employer/signup.html" && pathname!="/employer/login.html"){
        var c= pathname.indexOf("recruitment");
        if(c>0)
        location.href="../login.html";
         else
         	location.href="login.html";
       
   }
   else{
   	return;
   }
    // Display the splash page where you can sign-in.
    
  }
}


function login(){
	
	$('#signup_li').css('display','none');
	$('#login_li').css('display','none');
	$('#user-details').css('display','block');
   

}

function logout(){

		$('#user-details').css('display','none');

	$('#signup_li').show();
	$('#login_li').show();
   

}

function setdetails(user,userProfile){
  $('#user-name').text(user.displayName);
  if(user.photoURL==null || user.photoURL =="" || user.photoURL ==undefined){
     $('#user-image').attr("src","../images/user_image.jpg");
  }
  else{
    $('#user-image').attr("src",user.photoURL);
  }

   $('#postedRecruitmentCount').text(userProfile.recruitmentCount);
 $('#confirmedRecruitmentCount').text(userProfile.confirmedRecruitmentCount);
 $('#applicationCount').text(userProfile.applicationCount);

  
  $('#contact_person').val(userProfile.contact_person);
  $('#email').val(userProfile.email);
  $('#phone').val(userProfile.phone);
  $('#mobile').val(userProfile.mobile);
 $('#industry_type').val(userProfile.industry_type);



  }



  function checkEmployer(){

      employers.once('value', function(snapshot) {
  if (snapshot.hasChild(currentUID)) {
       return true;
  }
  else
     return false;
});

  }


  function saveProfile(profile){
  	

      employers.child(currentUID).set(profile[0]).then(function(){
      	console.log("Success");
     }),function(error){
           console.log(error);
      };

  }




    function updatedisplayName(name){
   

   Auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

user.sendEmailVerification().then(function() {
  // Email sent.
  $('#modal-text').text('A verification email is sent to your ' + user.email + ' mail.Please check your mail to activate your Account');
        $("#modal_alert").modal({backdrop: true});
     
}, function(error) {
  // An error happened.
});

    user.updateProfile({
  displayName: name,
 
}).then(function() {
  

}, function(error) {
  // An error happened.
});
  } else {
    // No user is signed in.
  }
});


  }



