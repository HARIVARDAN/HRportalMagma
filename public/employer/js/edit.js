$(document).ready(function(){

  $('#save_posted_recruitment_btn').click(function(){
         postRecruitment();
  });
});


function setEditData(){


var b = $(location).attr('search');

var pushId=b.substr(1);
var details;

 var JobDetailsref = firebase.database().ref('recruitments/'+pushId);
      
  JobDetailsref.on("value",function(snapshot){
      details=snapshot.val();
     
    $('#contact_person').val(details.hr_name);
      $('#email').val(details.hr_email);
     $('#phone').val(details.hr_phone);
      $('#company_name').val(details.company_name);
      $('#website').val(details.website);
      $('#job_title').val(details.job_title);
      $('#last_date').val(details.last_date);
     $('#exp_month').val(details.exp_month);   
  $('#exp_year').val(details.exp_year);
      $('#vacancies').val(details.vacancies);
        $('#job_location').val(details.job_location);
     $('#about_company').val(details.about_company);
   $('#education').val(details.education);
     $('#salary').val(details.salary);
     $('#skills').val(details.skills);
     $('#job_description').val(details.job_description);
     $('#mobile').val(details.mobile);
     $('#industry_type').val(details.industry_type);

});
}



function postRecruitment(){

  var hr_name,hr_email,hr_phone,mobile,company_name,website,office_address,exp_year,exp_month,vacancies,job_location,skills,about_company,last_date,education,salary,job_description;

       hr_name=$('#contact_person').val();
       hr_email=$('#email').val();
       hr_phone=$('#phone').val();
        mobile =$('#mobile').val();
       company_name=userProfile.company_name;
     
        office_address=userProfile.office_address; 
         job_title=$('#job_title').val();
         industry_type =$('#industry_type').val();
         website=$('#website').val();
         exp_year=$('#exp_year').val();
        exp_month=$('#exp_month').val();
        vacancies=$('#vacancies').val();
        job_location=$('#job_location').val();
        skills=$('#skills').val();
        education=$('#education').val();
        salary=$('#salary').val();
        job_description=$('#job_description').val();
        about_company =$('#about_company').val();
        last_date =$('#last_date').val();

 var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var post_date = dd+'/'+mm+'/'+yyyy;



        var postData={
          job_title:job_title,
          hr_name :hr_name,
         hr_phone:hr_phone,
         hr_email:hr_email,
         mobile : mobile,
         company_name:company_name,
         website:website,
         office_address : office_address,
         industry_type :industry_type,
         exp_month:exp_month,
         exp_year :exp_year,
         vacancies : vacancies,
         job_location : job_location,
         education :education,
         skills :skills,
         salary :salary,
         job_description :job_description,
         post_date : post_date,
          last_date :last_date
        };


   if(company_name=="" || industry_type=="" || exp_year==""|| exp_month==""|| job_location=="" || job_description=="" || hr_phone=="" || hr_email==""||
     hr_name=="" || mobile=="" || vacancies=="" || last_date=="" || skills=="" || website=="" || salary=="" || education=="" || job_description=="" ||job_description==null ){
      
         $('#modal-text').text("Please fill all the Details");
        $("#modal_alert").modal({backdrop: true});
        return;
     }

 if(!validateEmail(hr_email)) {
            $('#modal-text').text("Please enter a valid Email");
        $("#modal_alert").modal({backdrop: true});
        return;
      }



      if(!validatePhone){
        return;
      }
     

else{
     $("#modal_process").modal({backdrop: "static"});

 var q = $(location).attr('search');

var newPostKey=q.substr(1);
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/recruitments/' + newPostKey] = postData;
  updates['/Employers/' + currentUID + '/' + '/recruitments/'+ newPostKey] = postData;

 
  if(firebase.database().ref().update(updates)){
    $("#modal_process").modal('hide');
    $('#modal-text').text("Succeesfully Updated");
        $("#modal_alert").modal({backdrop: true});
  }
  else{
    $("#modal_process").modal('hide');
    $('#modal-text').text("Failed to update. Please try again");
        $("#modal_alert").modal({backdrop: true});
  }


 }
  

  }