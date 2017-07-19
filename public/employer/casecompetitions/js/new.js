$(window).ready(function(){
 
 document.getElementById('file').addEventListener('change', handleFileSelect, false);

var upload_url;  
var startTimeStamp,endTimeStamp,presentTimeStamp;

$('#submit').click(function(){
    
  var p=create_competiton();


  if(p){
     alert("Successful");
     location.href="../casecompetitions.html";
  }
  else
    alert("Failed");
    
});


    function create_competiton(){

   
      var competition_name = $('#competition_name').val();
      var category =  $('#competition_type').val();
      var data  = tinymce.get("texteditor").getContent();
      var rules = tinymce.get("rules").getContent();
      var prizes = tinymce.get("prizes").getContent();
      var url = upload_url;

   
      var postData =

       {
         presentTimeStamp : presentTimeStamp,
         startTimeStamp : startTimeStamp,
         endTimeStamp : endTimeStamp,
         competition_name : competition_name,
         category : category,
         about_competitoin :data,
         rules : rules,
         prizes : prizes,
         question_url : url,
         empId : currentUID,
         company_name : userProfile.company_name,
         status: 0

      }
 
     var newPostKey = casecompetitions.push().key;

      var updates = {};
  updates['/Case Competitions/' + newPostKey] = postData;
  updates['/Employer Case Competitions/' + currentUID +'/'+ newPostKey] = postData;
  updates['/Category Case Competitions/' + category + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);




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
      storageRef.child('competitons/' + currentUID+'/'+ file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        var url = snapshot.downloadURL;
        console.log('File available at', url);
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



	$('#next_btn').click(function(){

	  var startDate=$('#startDate').val();
	  var startTime=$('#startTime').val();
    var NewstartDate = startDate + " " + startTime;
  
    var endDate = $('#endDate').val();
    var endTime = $('#endTime').val();
    var NewendDate = endDate + " "+ endTime;

     startTimeStamp =new Date(NewstartDate).getTime();
     endTimeStamp = new Date(NewendDate).getTime();
    
    var presentDate = new Date();
    presentTimeStamp = new Date(presentDate).getTime();


    if(startTimeStamp > presentTimeStamp && endTimeStamp > startTimeStamp)
    
      {
             
        
        $('#competition_time_details').css('display','none');
        $('#competition_details').show();



      }

     else{
      alert("Please select the corrrect Date and Timings");
     }
    

   

	});

});