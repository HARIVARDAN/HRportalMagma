
   $(document).ready(function(){

                     
       var y= $(location).attr('search');
           y=y.substr(1);
       var appId  = y.split('&')[1];
       var userId = y.split('&')[0];

       $('#approve_btn').click(function(){
          
          var date=getdate();

          applications.child(currentUID+'/'+appId+'/status').set(2).then(function(){

            applications.child(currentUID+'/'+appId+'/approved_date').set(date);

            UserApplications.child(userId+'/'+appId+'/status').set(2).then(function(){

              UserApplications.child(userId+'/'+appId+'/approved_date').set(date);

               Totalapplications.child(appId+'/approved_date').set(date);
              
               Totalapplications.child(appId+'/status').set(2).then(function(){

                  $('#modal-text').text('Approved');
                  $("#modal_alert").modal({backdrop: true});

                  location.href="../applications.html";

               });

            });
            
          });

       });

       $('#reject_btn').click(function(){

          var date=getdate();

          applications.child(currentUID+'/'+appId+'/status').set(3).then(function(){

            applications.child(currentUID+'/'+appId+'/rejected_date').set(date);

            UserApplications.child(userId+'/'+appId+'/status').set(3).then(function(){

              UserApplications.child(userId+'/'+appId+'/rejected_date').set(date);

               Totalapplications.child(appId+'/rejected_date').set(date);
              
               Totalapplications.child(appId+'/status').set(3).then(function(){

                  $('#modal-text').text('Approved');
                  $("#modal_alert").modal({backdrop: true});

                   location.href="../applications.html";

               });

            });
            
          });
    

        });

       $('#remove_btn').click(function(){

             applications.child(currentUID+'/'+appId).remove().then(function(){

                  $('#modal-text').text('Successfully Removed');
                  $("#modal_alert").modal({backdrop: true});

             });


       });



   });

function getAppDetails(){

         x = $(location).attr('search');
          x = x.substr(1);

       if(x=="" || x==null){
          location.href="../home.html";
            return;
        }
       var pushId= x.split('&')[0];
       var appId = x.split('&')[1];
          

   var details;
   var UserDetailsref = firebase.database().ref('users/'+pushId);
      
    UserDetailsref.on("value",function(snapshot){
  
    details=snapshot.val();
   

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



  
      applications.child(currentUID+'/'+appId).once('value',function(snapshot1){
         var appDetails=snapshot1.val();
         var status=appDetails.status;
         
      
         
       if(status==0){

       applications.child(currentUID+'/'+appId+'/status').set(1).then(function(){
           
            UserApplications.child(pushId+'/'+appId+'/status').set(1).then(function(){
              
               Totalapplications.child(appId+'/status').set(1).then(function(){


               });
            });
         }); 

         }

         else if(status==2){

               $('#modal-text').text('You have already Approved this Application');
               $("#modal_alert").modal({backdrop: true});
               $('#approve_btn').hide();

               $('#approved_show').show();
         }  

            else if(status==3){

               $('#modal-text').text('You have already Rejected this Application');
               $("#modal_alert").modal({backdrop: true});
               $('#reject_btn').hide();
               $('#rejected_show').show();
         }  


    });
   
    

});



 
   }

function getdate(){

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
                      
                      var date = dd+'/'+mm+'/'+yyyy;

                      return date;
}

