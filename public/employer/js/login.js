$(document).ready(function(){

   $('#login_btn').click(function(){
    SignIn();
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

function SignIn() {
      
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

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
        $("#modal_process").modal({backdrop: "static"});
        // Sign in with email and pass.
        // [START authwithemail]
        Auth.signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
         
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            $("#modal_process").modal('hide');
             $('#modal-text').text("Wrong Password");
              $("#modal_alert").modal({backdrop: true});
          } else {
            $("#modal_process").modal('hide');
             $('#modal-text').text("Error : "+errorMessage +" Please try again");
             $("#modal_alert").modal({backdrop: true});
          }
     
          
          // [END_EXCLUDE]
        });
        // [END authwithemail]
        
      }