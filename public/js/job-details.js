

var employerId,job_title,company_name;
$(document).ready(function(){

    
    $('#next_job_details').click(function(){

       $('#section-underline-1').hide();
       $('#section-underline-2').show();

    });

    $('#previous_job_details').click(function(){

       $('#section-underline-2').hide();
       $('#section-underline-1').show();
       
    });



    $('#apply').click(function(){
        
        if(currentUID)
        {
              var x = $(location).attr('search');
              var pushId=x.substr(1);

              var applicationsRef=firebase.database().ref('Applications/');

              var newPostKey=pushId.substr(0,4)+currentUID.substr(0,4)+employerId.substr(0,4);

              applicationsRef.once('value',function(snapshot1){
            if (snapshot1.hasChild(newPostKey)) 
             {
                      
                 $('#modal-text').html("You have already applied for this Job.");
                 $("#modal_alert").modal({backdrop: true});
            }

          else
            {

                  $('#modal-text').html("Your present Profile and Resume with us is posted to the Recruiter.If any changes needed <a href='profile.html'>Edit/See Profile </a> before applying. for confirmation of Details");
                  $("#modal_alert").modal({backdrop: true});

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
              
                       firebase.database().ref('users').once('value', function(snapshot) {
                       if (snapshot.hasChild(currentUID)) 
                       {
 
                        var details = {
                                  applierId :currentUID,
                                  postId  : pushId,
                                  employerId : employerId,
                                  name: global_username,
                                  job_title :job_title,
                                  post_date :post_date,
                                  company_name:company_name,
                                  status :0
                                 };

                

                  
                  var employerApplications=firebase.database().ref('Employers/'+employerId);
                  var userApplicatonCountRef=firebase.database().ref('users/'+currentUID);

                  

                  var updates = {}; 
                  updates['Employer Applications/' + employerId + '/' + newPostKey] = details;
                  updates['Applications/' + newPostKey] = details;
                  updates['User Applications/' + currentUID + '/' + newPostKey] = details;

                 
 
                 if(firebase.database().ref().update(updates)){
                         count(applicationsRef);
                         count(employerApplications);
                         count(userApplicatonCountRef);

                          $('#modal-text').html("Thanks for your Interest. Your Application has been posted.Soon we will contact you.");
                         $("#modal_alert").modal({backdrop: true});

                    }

                  else{

                           $('#modal-text').html("Something went wrong.Please try again");
                           $("#modal_alert").modal({backdrop: true});

                    }  

            
                 
            }

            else
            {
                 $('#modal-text').html("Please update your Profile to Apply for the Job");
                 $("#modal_alert").modal({backdrop: true});
            }

          });


        }

      });
            }
        else
        {
             $('#modal-text').html("Please <a href='login.html'>LogIn</a> to Apply for the Job");
             $("#modal_alert").modal({backdrop: true});
        }
    });


   
        







});

 function count(postRef)
 {
    
    postRef.child('applicationCount').transaction(function(current) {
   
     return (current || 0) + 1;
    }, 

     function(error, committed, snapshot) {
      if (error)
       {
         console.error(error);
       } 
    });
  }

function getJobDetails()
{

     var x = $(location).attr('search');
     var details;
     var pushId=x.substr(1);
     var JobDetailsref = firebase.database().ref('Confirmed Recruitments/')

    

    JobDetailsref.once("value",function(snapshot1){


  if(snapshot1.hasChild(pushId)){

    JobDetailsref.child(pushId).on("value",function(snapshot){
  
  	details=snapshot.val();
    employerId=details.uid;
    job_title=details.job_title;
    company_name=details.company_name;
  
  
      $('#job_title').text(details.job_title);
      $('#hr_name').text(details.hr_name);
      $('#hr_email').text(details.hr_email);
      $('#hr_phone').text(details.hr_phone);
      $('#company_name').text(details.company_name);
      $('#website').text(details.website);
      $('#office_address').text(details.office_address); 
      $('#remark').text(details.remark);
      $('#exp_year').text(details.exp_year+" Years");
      $('#exp_month').text(details.exp_month+" Months");
      $('#last_date').text(details.last_date);
      $('#skills').text(details.skills);
      $('#about_company').text(details.about_company);
      $('#mobile').text(details.mobile);
      $('#vacancies').text(details.vacancies);
      $('#job_location').text(details.job_location);
      $('#designation').text(details.designation);
      $('#education').text(details.education);
      $('#salary').text(details.salary);
      $('#job_description').text(details.job_description);

    setTimeout(function(){
      if(currentUID)
        {
              
              var applicationsRef=firebase.database().ref('Applications/');

              var newPostKey=pushId.substr(0,4)+currentUID.substr(0,4)+employerId.substr(0,4);

              applicationsRef.once('value',function(snapshot1){
            if (snapshot1.hasChild(newPostKey)) 
             {
                 $('#modal-text').html("You have already applied for this Job.");
                 $("#modal_alert").modal({backdrop: true});   
                 $('#apply').hide();
                 $('#applied_div').show();
              }

            });

         } 
     },500);
          

   });
 }

 else{

      $('#modal-text').html("Specified Job Details are not availablle.");
      $("#modal_alert").modal({backdrop: true}); 
      location.href="current_job.html";

     }

 });   
 
}  

