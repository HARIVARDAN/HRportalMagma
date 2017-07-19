

$(document).ready(function(){


$('#post_recruitment_submit_btn').click(function(){
  
 postRecruitment();
 
});

});



function postRecruitment(){

  var hr_name,hr_email,hr_phone,mobile,company_name,website,office_address,exp_year,exp_month,vacancies,job_location,skills,about_company,last_date,education,salary,job_description,t_c_check_box;

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
         t_c_check_box= document.getElementById("terms-conditions_check_box").checked;

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

 console.log(post_date);

        var postData={
          about_company :about_company,
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
          last_date :last_date,
          uid:currentUID,
          confirmation : 0
        };


   if(company_name=="" || industry_type=="" || exp_year==""|| exp_month==""|| job_location=="" || job_description=="" || hr_phone=="" || hr_email==""||
     hr_name=="" || mobile=="" || vacancies=="" || last_date=="" || skills=="" || salary=="" || education=="" || job_description=="" ||job_description==null ){
       
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
      if(!t_c_check_box){
        $('#modal-text').text("Accept the terms and conditions");
        $("#modal_alert").modal({backdrop: true});
        return;
      }


else{
     $("#modal_process").modal({backdrop: "static"});

   // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('recruitments').push().key;

var totalRecruitmentCountRef=firebase.database().ref().child('recruitments');
var recruitmentCountRef=employers.child(currentUID);
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/recruitments/' + newPostKey] = postData;
  updates['/Employer Recruitments/' + currentUID + '/' + newPostKey] = postData;


  
 
  if(firebase.database().ref().update(updates)){
    count(recruitmentCountRef);
    count(totalRecruitmentCountRef)
    $("#modal_process").modal('hide');
    $('#modal-text').text("Succeesfully Posted");
        $("#modal_alert").modal({backdrop: true});
  }
  else{
    $("#modal_process").modal('hide');
    $('#modal-text').text("Failed to post. Please try again");
        $("#modal_alert").modal({backdrop: true});
  }


 }
  

  }


   function count(postRef){
    
    postRef.child('recruitmentCount').transaction(function(current) {
    // Increment readCount by 1, or set to 1 if it was undefined before.
    return (current || 0) + 1;
  }, function(error, committed, snapshot) {
    if (error) {
      // The fetch succeeded, but the update failed.
      console.error(error);
    } 
  });
  }

function toggleStar(postRef, uid) {
  postRef.transaction(function(post) {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}


function updatePostedRecruitments(postRef, uid) {
  postRef.transaction(function(post) {
    console.log(post);
    if (post) {
      if (post.recruitment_uids && post.recruitment_uids[uid]) {
        post.recruitmentCount--;
        post.recruitment_uids[uid] = null;
      } else {
        post.recruitmentCount++;
        if (!post.recruitment_uids) {
          post.recruitment_uids = {};
        }
        post.recruitment_uids[uid] = true;
      }
    }
    return post;
  });
}