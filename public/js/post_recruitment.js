

$(document).ready(function(){


$('#post_recruitment_submit_btn').click(function(){
  
  var p=postRecruitment();
  if(p){
    alert("Successful");
  }
  else{
    alert("Failed");
  }
});

});



function postRecruitment(){

  var hr_name,hr_email,hr_phone,mobile,company_name,website,office_address,remark,exp_year,exp_month,vacancies,job_location,skills,about_company,last_date,education,salary,job_description;

       hr_name=$('#contact_person').val();
       hr_email=$('#email').val();
       hr_phone=$('#phone').val();
        mobile =$('#mobile').val();
       company_name=userProfile.company_name;
     
        office_address=userProfile.office_address; 
  
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
              
          hr_name :hr_name,
         hr_phone:hr_phone,
         hr_email:hr_email,
         mobile : mobile,
         company_name:company_name,
         website:website,
         office_address : office_address,
         remark : remark,
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


  

   // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('recruitments').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/recruitments/' + newPostKey] = postData;
  updates['/Employers/' + currentUID + '/' + '/recruitments/'+ newPostKey] = postData;

  return firebase.database().ref().update(updates);


 
  

  }