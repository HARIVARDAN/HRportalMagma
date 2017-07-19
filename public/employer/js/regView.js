function getDetails(){

         x = $(location).attr('search');
          x = x.substr(1);

     
       var pushId= x;
       
          

   var details;
   var UserDetailsref = firebase.database().ref('users/'+pushId);
      
    UserDetailsref.on("value",function(snapshot){
  
    details=snapshot.val();
    console.log(details);

    if(details.gender=="true")
      gender="Male"
    else if(details.marital_status=="false")
      gender="Female";
  
    $('#p_name').val(details.name);
    $('#p_email').val(details.email);
    $('#p_city').val(details.city);
    $('#p_phone').val(details.phone);
    $('#alt_p_phone').val(details.alt_phone);
    $('#p_state').val(details.state);
    $('#p_resume_url').val(details.url);
    $('#p_gender').val(gender);
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
    $('#p_marital_status').val(details.marital_status);
    $('#p_institution').val(details.institution);
    $('#p_passout_year').val(details.passOutyear);
    $('#download').attr('href',details.url);
    $('#resumeView').attr('href',details.url);



  });

 }   
