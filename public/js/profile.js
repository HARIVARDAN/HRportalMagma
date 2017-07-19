
var global_url="";


$(document).ready(function(){


        
document.getElementById('file').addEventListener('change', handleFileSelect, false);
     
  $('#update_data_btn').click(function(){
    
         post_profile();

  });


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

  
  function post_profile(){


      var name=$('#p_name').val();
      var email =$('#p_email').val();
      var phone=$('#p_phone').val();
      var city = $('#p_city').val();
      var alt_phone =$('#alt_p_phone').val();
      var state = $('#p_state').val();
      var job_industry=$('#p_job_industry').val();
      var resume_title=$('#p_resume_title').val();
      var education =$('#p_education').val();
      var address = $('#p_address').val();
      var salary = $('#p_salary').val();
      var institution = $('#p_institution').val();
      var designation = $('#p_designation').val();
      var passOutyear = $('#p_passout_year').val();
      var functional_area =$('#p_functional_area').val();
      var exp_year=$('#p_experience_year').val();
      var exp_month=$('#p_experience_month').val();
      var dob=$('#p_dob').val();
      var x=global_url;
      var url=upload_url;

    
       
    var selected = $("input[type='radio'][name='gender']:checked");
if (selected.length > 0) {
    var gender = selected.val();
}


       var selected = $("input[type='radio'][name='marital_status']:checked");
if (selected.length > 0) {
    var marital_status = selected.val();
}


if(name==null || name==""|| email==null || email=="" || gender==null || gender=="" || phone=="" || phone==null || city =="" || city ==null || state=="" ||
      state ==null || job_industry=="" || job_industry ==null || resume_title=="" || resume_title==null || education=="" || education==null || passOutyear=="" ||
      marital_status=="" || marital_status==null || address=="" || address == null || institution=="" || designation=="" || exp_year=="" || exp_month=="" || functional_area==""){
    console.log("hai");
     $('#modal-text').text("Please fill all the Details");
        $("#modal_alert").modal({backdrop: true});
      return;
    } 

    if((url==null || url=="") && (x==null || x==undefined || x =="")){
     
        $('#upload_msg').addClass('danger');
       $('#upload_msg').text('Please Upload Resume');
       return;
          }
          if((url==null || url=="")){
            url=x;
          }
      


if(validatePhone(phone) && validateEmail(email)){

  var postData={
         name :name,
         email :email,
         gender:gender,
         phone :phone,
         alt_phone : alt_phone,
         city :city,
         state:state,
         job_industry : job_industry,
         resume_title :resume_title,
         url:url,
         dob:dob,
         education :education,
         marital_status :marital_status,
         address:address,
         salary :salary,
         institution : institution,
         designation : designation,
         passOutyear : passOutyear,
         exp_month : exp_month,
         exp_year :exp_year,
         functional_area :functional_area
         
     };



   firebase.database().ref('users/'+ currentUID ).set(postData).then(function(){
        
        $('#modal-text').text("Successfully updated.Thanks for your Data.");
        $("#modal_alert").modal({backdrop: true});
       setTimeout(function(){
        location.href="/";

       },1500);
     
    }),function(error){
   
       $('#modal-text').text("Failed.Please try again");
        $("#modal_alert").modal({backdrop: true});
    };

    
      
   }

}

});


function getUserDetails(){


setTimeout(function(){

   var details;
   console.log(currentUID);
   var UserDetailsref = firebase.database().ref('users/');


UserDetailsref.once('value', function(snapshot1) {
  if (snapshot1.hasChild(currentUID))
  {
     


      
  UserDetailsref.child(currentUID).once("value",function(snapshot){
  
    details=snapshot.val();
   

    global_url = details.url;
  
    $('#p_name').val(details.name);
    $('#p_email').val(details.email);
    $('#p_city').val(details.city);
    $('#p_phone').val(details.phone);
    $('#p_state').val(details.state);
    $('#alt_p_phone').val(details.alt_phone);
    $('#p_resume_url').attr('href',details.url);
    $('#p_institution').val(details.institution);
    $('#p_passout_year').val(details.passOutyear);
    $('#p_resume_title').val(details.resume_title);
    $('#p_job_industry').val(details.job_industry);
    $('#p_dob').val(details.dob);
    $('#p_experience_month').val(details.exp_month);
    $('#p_experience_year').val(details.exp_year);
    $('#p_designation').val(details.designation);
    $('#p_address').val(details.address);
    $('#p_salary').val(details.salary);
    $('#p_functional_area').val(details.functional_area);
    $('#p_education').val(details.education);

  var marriedRadiobtn = document.getElementById("married");
  var singleRadiobtn = document.getElementById("single");
  if(details.marital_status=="Single")
     singleRadiobtn.checked = true;
   else if(details.marital_status=="Married")
    marriedRadiobtn.checked=true;

  var maleRadiobtn = document.getElementById("gender_male");
  var singleRadiobtn = document.getElementById("gender_female");
  if(details.gender=="true")
     maleRadiobtn.checked = true;
   else if(details.marital_status=="false")
      femaleRadiobtn.checked=true;


   $('#loading1').hide();
   $('#main-body-profile').show();
   $('#bottom1').show();
   $('#footer1').show();
    

});

}
else{
  $('#loading1').hide();
   $('#main-body-profile').show();
   $('#bottom1').show();
   $('#footer1').show();

}

});
},3500);
 
   }