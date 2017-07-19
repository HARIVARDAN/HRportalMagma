
  


   function loadProfile(){

var x = $(location).attr('search');

var details;

  var UID=x.substr(1);


   var UserDetailsref = firebase.database().ref('users/'+UID);
      
  UserDetailsref.on("value",function(snapshot){
  
    details=snapshot.val();
    var gender;
    if(details.gender=="true")
      gender="Male";
    else
      gender="Female";
  
    $('#p_name').val(details.name);
    $('#p_email').val(details.email);
    $('#p_city').val(details.city);
    $('#p_phone').val(details.phone);
    $('#p_state').val(details.state);
    $('#p_resume_url').val(details.url);
    $('#p_gender').val(gender);
    $('#p_resume_title').val(details.resume_title);
    $('#p_job_industry').val(details.job_industry);
    $('#p_dob').val(details.dob);
    $('#p_exp_year').val(details.exp_year + " Years");
    $('#p_exp_month').val(details.exp_month + " Months");
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
    

});
}
