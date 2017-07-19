
 var currentUID;
 var global_username,global_user_image;
var config = {
  apiKey: "AIzaSyBWhSdFyk14MFyqdPfv8148flACw1gCzTY",
    authDomain: "jcr-hr-solutions.firebaseapp.com",
    databaseURL: "https://jcr-hr-solutions.firebaseio.com",
    projectId: "jcr-hr-solutions",
    storageBucket: "jcr-hr-solutions.appspot.com",
    messagingSenderId: "951267740259"
  };
  
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users_post_resume/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

function onAuthStateChanged(user) {
  // We ignore token refresh events.


  if (user && currentUID === user.uid) {
console.log(currentUID);
    if(pathname!="/signup.html" || pathname!="/login.html"){
        	return;
   }
   else
   	location.href="index.html";

   	  $('#employer').hide();
     	login();
      setdetails(user);
 
    return;
 }

 

  
else if (user) {
 
 firebase.database().ref('Employers/').once('value', function(snapshot){

   if (snapshot.hasChild(user.uid))
   {
    
      $('#employer-modal-text').html("You are logged in as an Employer.<br> Please follow the <a href='employer/login.html'>link</a><br/>Thank you");
      $("#modal_post_recruitment").modal({backdrop: "static"});
      return;
   }

  else
  {
      var p=Object.values(user.providerData);
      var provider=p[0].providerId;  

    if(provider!="facebook.com" && !user.emailVerified)
     {
    
        $('#modal-text').text('A verification email is sent to your ' + user.email + ' mail.Please check your mail to activate your Account');
        $("#modal_alert").modal({backdrop: true});
         firebase.auth().signOut();
          return;
     }
 
     else
    { 
         currentUID = user.uid;
      
    
     
      $('#employer').hide();
    
      var pathname = window.location.pathname;

      if(pathname=="/signup.html" || pathname=="/login.html"){
        location.href="post-resume.html";
       }
  
       login();
       setdetails(user);
    
     }
   }

 });

}

 else 
  {
     currentUID = null;
     logout();
       
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



 

function login(){
    $('#post_recruitment_btn').hide();
	  $('#side_applications_btn').show();
	  $('#signup_li').css('display','none');
	  $('#login_li').css('display','none');
	  $('#user-details').css('display','block');
    $('#employer').hide();

}

function logout(){

	$('#user-details').css('display','none');
  $('#employer').show();
	$('#signup_li').show();
	$('#login_li').show();
  $('#loading').hide();
  $('#main-body').show();
  $('#feature').show();
  $('#contact-info').show();
  $('#bottom').show();
  $('#footer').show();
  $('#side_applications_btn').hide();
}

function setdetails(user){

   global_username=user.displayName;

  $('#user-name').text(user.displayName);
  if(user.photoURL==null || user.photoURL =="" || user.photoURL ==undefined){
     $('#user-image').attr("src","images/user_image.jpg");
  }
  else{
    $('#user-image').attr("src",user.photoURL);
  }

  $('#pcv_email').val(user.email);
  $('#full_name').val(user.displayName);
  $('#enq_name').val(user.displayName);
  $('#enq_email').val(user.email);
  $('#loading').hide();
  $('#main-body').show();
  $('#feature').show();
  $('#contact-info').show();
  $('#bottom').show();
  $('#footer').show();
  $('#p_name').val(user.displayName);
  $('#p_email').val(user.email);


  }


$(window).load(function(){

  'use strict';
		

		firebase.initializeApp(config);

   firebase.auth().onAuthStateChanged(onAuthStateChanged);
    $('#sign_in_google').click(function(){
		var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
	});

      $('#sign_in_fb').click(function(){
    fbSignIn();
  });


	$('#signout').click(function(){
		firebase.auth().signOut();
		location.href="index.html";
	});

$('#signout1').click(function(){
    firebase.auth().signOut();
    location.href="../";
  });



   $('#post_resume_btn').click(function(){
  
   if(currentUID){

     firebase.database().ref('users/').once('value', function(snapshot) {
  if (snapshot.hasChild(currentUID)) {
    location.href="profile.html";
  }
  else
    location.href="post-resume.html";
});
 
           
   }
   else{
        
        $("#modal").modal({backdrop: true});
    
   }

   });

 $('#signup_btn').click(function(){
 handleSignUp();
  
 });

 $('#login_btn').click(function(){
  
  SignIn();  
 

  });

$('#post_recruitment_btn').click(function(){

   $('#employer-modal-text').html("Thanks for your Interest.<br/> You should Sign In as a Employer to post a Recruitment.<br/> Please <a href='employer/login.html'>Login</a> to post the Recruitment.")
   $("#modal_post_recruitment").modal({backdrop:true});
    
});
   $('#post_enquiry_btn').click(function(){
      post_enquiry();

   });

   $('#contact_post_message').click(function(){
   
    post_contact_message();
   });

   $('#post_resume_data_btn').click(function(){
      post_resume();

   });


   $('#forgot_password').click(function(){

        $("#modal_fgpw").modal({backdrop: true}); 
   });

  
   $('#fgpw_submit').click(function() {

     var auth = firebase.auth();
     var emailAddress = $('#forgot_email').val();

    auth.sendPasswordResetEmail(emailAddress).then(function() {
       // Email sent.
       $('#modal-text').text("Password reset link is sent to your email");
       $("#modal_alert").modal({backdrop: true}); 
       $('#forgot_email').val("");

     }, function(error) {
       // An error happened.
        $('modal-text').text(error);
        $("modal_alert").modal({backdrop: true}); 
       

   });


});



});
  function handleSignUp() {
       $('#modal-text').text("Registering..Please wait");
        $("#modal_alert").modal({backdrop: "static"});
 

      var name=document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var cpassword=$('#cpassword').val();
      var t_c_check_box= document.getElementById("terms-conditions_check_box").checked;     
  


     if(name=="" || email=="" || password =="" || cpassword==""){
         $('#modal-text').text("Please fill all the Details");
        $("#modal_alert").modal({backdrop: true});
        return;
     }
       

      if (!validateEmail(email)) {
            $('#modal-text').text("Please enter a valid Email");
        $("#modal_alert").modal({backdrop: true});
        return;
      }

      if (password.length < 6) {
         $('#modal-text').text("Minimum length of password is 6");
        $("#modal_alert").modal({backdrop: true});
        return;
      }

      if(password!==cpassword){
         $('#modal-text').text("Passwords not matching");
        $("#modal_alert").modal({backdrop: true});
      }

      if(!t_c_check_box){
        $('#modal-text').text("Accept the terms and conditions");
        $("#modal_alert").modal({backdrop: true});
        return;
      }

      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          $('#modal-text').text("Password is too weak");
          $("#modal_alert").modal({backdrop: true});
          return;
        } else {
          $('#modal-text').text(errorMessage);
        $("#modal_alert").modal({backdrop: true});
          return;
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
      $("#modal_alert").modal('hide');
      setTimeout(updatedisplayName(name),1000);
    
    }

    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      // [START sendemailverification]
          

      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
       
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }





  function updatedisplayName(name){
   

   firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    user.updateProfile({
  displayName: name,
 
}).then(function() {
 
    sendEmailVerification();

}, function(error) {
  // An error happened.
});
  } else {
    // No user is signed in.
  }
});


  }


//fn to save post recruitment data





  function post_enquiry(){
 
     var name=$('#enq_name').val();
     var email=$('#enq_email').val();
     var phone=$('#enq_phone').val();
     var query=$('#enq_query').val();

     var postData={

        name :name,
         email :email,
         phone :phone,
         query :query
     }
    
    if(name==null || name=="" || email==null || email=="" || query ==null || query =="" ){
        $('#modal-text').text("Please fill all the Details");
        $("#modal_alert").modal({backdrop: true});
      return;
    }
    if(validateEmail(email) && validatePhone(phone))

{

    var newPostKey = firebase.database().ref().child('enquiries').push().key;

   firebase.database().ref('enquiries/' + newPostKey).set(postData).then(function(){
   
          $('#modal-text').text("Thanks for your enquiry..Soon we will contact you");
        $("#modal_alert").modal({backdrop: true});
      return;
    }),function(error){
   

       $('#modal-text').text("Error : "+error +" Occured Data not saved.. please submit the enquiry again");
        $("#modal_alert").modal({backdrop: true});
    };

}


  }

  function validateEmail(email) {
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

  function post_contact_message(){
 
     var name=$('#enq_name').val();
     var email=$('#enq_email').val();
     var phone=$('#enq_phone').val();
     var subject=$('#contact_subject').val();
     var message=$('#contact_message').val();


     var postData={

        name :name,
         email :email,
         phone :phone,
         subject :subject,
         message:message
     }
    
if(name==null || name=="" || email==null || email=="" || subject ==null || subject =="" || message==null || message==""){
        $('#modal-text').text("Please fill all the Details");
        $("#modal_alert").modal({backdrop: true});
      return;
    }
    if(validateEmail(email) && validatePhone(phone))

{

    var newPostKey = firebase.database().ref().child('contactUs').push().key;

   firebase.database().ref('contactUs/' + newPostKey).set(postData).then(function(){
        
           $('#modal-text').text("Thanks for your message..Soon we will contact you");
        $("#modal_alert").modal({backdrop: true});
    }),function(error){
   
     
       $('#modal-text').text("Error : "+error +" Occured Data not saved.. please submit the message again");
        $("#modal_alert").modal({backdrop: true});
    };

}


  }

   function SignIn() {
      
        var email = document.getElementById('login_email').value;
        var password = document.getElementById('login_password').value;

        if(email=="" || email==null || password=="" ){
          $('#modal-text').text("Please fill the Details");
        $("#modal_alert").modal({backdrop: true});
        return;
        }
        
        if (!validateEmail(email)) {
          $('#modal-text').text("Please enter a valid Email");
        $("#modal_alert").modal({backdrop: true});
          return;
        }
        
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
             $('#modal-text').text("Wrong Password");
              $("#modal_alert").modal({backdrop: true});
          } else {
             $('#modal-text').text("Error : "+errorMessage +" Please try again");
             $("#modal_alert").modal({backdrop: true});
          }
     
          
          // [END_EXCLUDE]
        });
        // [END authwithemail]
        
      }
     
    



  


var upload_status,upload_url;

   function post_resume(){


      var name=$('#full_name').val();
      var email =$('#pcv_email').val();
      var phone=$('#pcv_phone').val();
      var city = $('#pcv_city').val();
      var state = $('#state').val();
      var job_industry=$('#job_industry').val();
       var resume_title=$('#resume_title').val();
       var url=upload_url;
       


       var selected = $("input[type='radio'][name='gender']:checked");
if (selected.length > 0) {
    var gender = selected.val();
}
else{
  console.log("errrjnjkl");
}

    if(url==null || url==""){
      $('#upload_msg').addClass('danger');
       $('#upload_msg').text('Please Upload Resume');
      return;
    }

    if(name==null || name==""|| email==null || email=="" || gender==null || gender=="" || phone=="" || phone==null || city =="" || city ==null || state=="" ||
      state ==null || job_industry=="" || job_industry ==null || resume_title=="" || resume_title==null){
      alert("Please fill all the Details");
      return;
    }

else{


  var postData={
         name :name,
        email :email,
        gender:gender,
         phone :phone,
         city :city,
         state:state,
         job_industry : job_industry,
         resume_title :resume_title,
         url:url
         
     };



   firebase.database().ref('users/'+ currentUID ).set(postData).then(function(){
        alert("Thanks for your data..Soon we will contact you");
        return;
    }),function(error){
   
      alert(error+ "  Data not saved.. please submit the data again"); 
    };

    
      }
   }




    function handleFileSelect(evt) {

       var storageRef = firebase.storage().ref();
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];

      var metadata = {
        'contentType': file.type
      };
      $('#upload_msg').addClass('success');
  $('#upload_msg').text("Uploading..");
      

      // Push to child path.
      // [START oncomplete]
      storageRef.child('resumes/' + currentUID+'/'+ file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        var url = snapshot.downloadURL;
        console.log('File available at', url);
        // [START_EXCLUDE]
       upload_url=url;
        $('#upload_msg').text('Uploaded Successfully');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // [START onfailure]
         $('#upload_msg').addClass('danger');
       $('#upload_msg').text('Upload failed');
       
        // [END onfailure]
      });
      // [END oncomplete]
    }



function checkUploadedResume(){
  var pathname = window.location.pathname;
  if(currentUID=="" || currentUID==null){
    location.href="../";
    return;
  }

    if(pathname=="/post-resume.html"){
 firebase.database().ref('users/').once('value', function(snapshot) {
  if (snapshot.hasChild(currentUID)) {
    location.href="profile.html";
  }

});

}
}
