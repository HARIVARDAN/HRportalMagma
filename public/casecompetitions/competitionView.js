var upload_url;
var pushId,category,competition_name;
$(document).ready(function(){

  document.getElementById('file').addEventListener('change', handleFileSelect, false);

    $('#submit_btn').click(function(){

     var p = submitSolution();

     if(p=="file"){

     }

    else if(p){
      alert("Submitted");
      window.history.back();
     }

     else{
      alert("error occured");
     }


   });

  $('#questionView_btn').click(function(){
       
        $("#question_modal").modal({backdrop: true});
  });


});

function loadProfile(){

var x = $(location).attr('search');
var details;
 pushId=x.substr(1);

 
var Competitionsref = firebase.database().ref('Case Competitions/');


Competitionsref.once('value', function(snapshot1) {

  if (snapshot1.hasChild(pushId))
  {
    
      
   Competitionsref.child(pushId).on("value",function(snapshot){
  
    details=snapshot.val();

    empId = details.empId;
    category = details.category;
    competition_name = details.competition_name;
  
     var presentDate = new Date();
     var presentTimeStamp = new Date(presentDate).getTime();

    if(presentTimeStamp>=details.startTimeStamp && presentTimeStamp <= details.endTimeStamp){

          $('#question_iframe').attr('src',details.question_url);

           firebase.database().ref('Registrations/' + pushId).once('value', function(snapshot) {
          
           if (snapshot.hasChild(currentUID)) {
    
              firebase.database().ref('Submissions/' + pushId).once('value',function(snapshot1){

                 if (snapshot1.hasChild(currentUID)) {
                  $('#submit_solution_div').hide();
                  $('#message').text("You have Submitted your Solution");
  
                   firebase.database().ref('User Submissions/' + currentUID + '/' + pushId).once('value',function(snapshot3){
                     
                   
                      var solution_details =snapshot3.val();
                 
                       $('#viewSolution').show();
                       $('#viewSolution').attr('href',solution_details.solution_url);
                   }),function(error){
                    console.log(error);
                   };


                }
                 else{
                  $('#submit_solution_div').show();
                 }

              });

             }

             else
               $('#submit_solution_div').hide();
               $('#message').text("You are not registered for this Competition");

           });

        }

    else if(presentTimeStamp > details.endTimeStamp){
         $('#submit_solution_div').hide();
         $('#question_iframe').attr('src',details.question_url);
         $('#message').text("Competition Ended");
    }  

    else{
          $('#question_div').hide();
          $('#submit_solution_div').hide();
    }


    $('#panel-title').text(details.competition_name);
    $('#competition_name').text(details.competition_name);
    $('#about_competition').html(details.about_competitoin);
    $('#category').text(details.category);
    $('#rules').html(details.rules);
    $('#prizes').html(details.prizes);
    $('#startDate').text(getDate(details.startTimeStamp));
    $('#startTime').text(getTime(details.startTimeStamp));
    $('#endDate').text(getDate(details.endTimeStamp));
    $('#endTime').text(getTime(details.endTimeStamp));
    $('#company_name').text(details.company_name);
  

  });
}

 else{
  alert("No data found");
  location.href="../";
 }

});

}

   
   function submitSolution(){

     var url = upload_url;
     var x = $(location).attr('search');
     var pushId=x.substr(1);

     if(url==null || url == "" || url == undefined)
     {
       alert("Please upload the file of your Solution");
       return "file";
     }

     else

     {

        var presentDate = new Date();
        var presentTimeStamp = new Date(presentDate).getTime();
        var postData =

        {
           solution_url : url,
           timeStamp : presentTimeStamp,
           name : global_username,
           competition_name : competition_name,
           category : category
        }
         
         var updates = {};

         updates['/Submissions/' + pushId + '/' + currentUID] = postData;
         updates['/User Submissions/' + currentUID + '/' + pushId ] = postData;

         return firebase.database().ref().update(updates);

     }
 
  
 }

    function handleFileSelect(evt) {

       var storageRef = firebase.storage().ref();
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];

      var metadata = {
        'contentType': file.type
      };
      $('#upload_msg').addClass('success');
  $('#upload_msg').text("Uploading..");
      

      // Push to child path.
      // [START oncomplete]
      storageRef.child('competitions_solutions/'+pushId+'/' + currentUID+'/'+ file.name).put(file, metadata).then(function(snapshot) {
      
        var url = snapshot.downloadURL;
       
        // [START_EXCLUDE]
       upload_url=url;
        $('#upload_msg').text('Uploaded Successfully');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // [START onfailure]
         $('#upload_msg').addClass('danger');
       $('#upload_msg').text('Upload failed');
       
        // [END onfailure]
      });
      // [END oncomplete]
    }


