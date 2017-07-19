$(document).ready(function(){
	

 $('#signup_btn').click(function(){
 	handleSignUp();
 });
var setProfile;

 function handleSignUp() {

      
       
 
     var company_name,industry_type,company_type,office_address,state,city,phone,contact_person,designation,email,mobile,alt_email,password,cpassword;



       company_name=$('#company_name').val();
       industry_type=$('#industry_type').val();
    
       office_address=$('#office_address').val();
       state=$('#state').val();
       city=$('#city').val();
       phone=$('#phone').val();
       contact_person=$('#contact_person').val();
       designation=$('#designation').val();
       mobile=$('#mobile').val();
       email = $('#email').val();
       alt_email=$('#alt_email').val();
       password = $('#password').val();
       cpassword=$('#cpassword').val();
       t_c_check_box= document.getElementById("terms-conditions_check_box").checked; 

       var selected = $("input[type='radio'][name='company_type']:checked");
if (selected.length > 0) {
     company_type = selected.val();
}

 


     if(company_name=="" || industry_type=="" || company_type==""|| office_address=="" || state=="" || city=="" || phone=="" || contact_person==""||
     designation=="" || mobile=="" ||  email=="" || password =="" || cpassword==""){
         $('#modal-text').text("Please fill all the Details");
        $("#modal_alert").modal({backdrop: true});
        return;
     }
       

      if (!validateEmail(email)) {
            $('#modal-text').text("Please enter a valid Email");
        $("#modal_alert").modal({backdrop: true});
        return;
      }

      if (password.length < 4) {
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

    var profile ={

        company_name :company_name,
        industry_type : industry_type,
        company_type : company_type,
        office_address : office_address,
        state : state,
        city : city,
        phone : phone,
        contact_person : contact_person,
        designation : designation,
        email :email,
        alt_email :alt_email,
        mobile : mobile,
      
    };
var errorCode;
 $("#modal_process").modal({backdrop: "static"});
      // Sign in with email and pass.
      // [START createwithemail]
      Auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
         errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
        	$("#modal_process").modal('hide');
          $('#modal-text').text("Password is too weak");
        $("#modal_alert").modal({backdrop: true});
          return;
        } else {
        	$("#modal_process").modal('hide');
          $('#modal-text').text(errorMessage);
        $("#modal_alert").modal({backdrop: true});
          return;
        }
        console.log(error);
        // [END_EXCLUDE]
      });

     
      
      
    
      setTimeout(function(){
      	 if(errorCode=="" || errorCode==null){
      	language.current = profile;
        setTimeout(updatedisplayName(contact_person),1000);

       }
      },1600);

    

    
}



 function sendEmailVerification() {
      // [START sendemailverification]
          

      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
       
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }
  













});