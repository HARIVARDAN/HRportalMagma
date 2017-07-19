var config = {
  apiKey: "AIzaSyBWhSdFyk14MFyqdPfv8148flACw1gCzTY",
    authDomain: "jcr-hr-solutions.firebaseapp.com",
    databaseURL: "https://jcr-hr-solutions.firebaseio.com",
    projectId: "jcr-hr-solutions",
    storageBucket: "jcr-hr-solutions.appspot.com",
    messagingSenderId: "951267740259"
  };
 
 function approve_competition(pushId,empId,category){
  

       var Competitionsref = firebase.database().ref('Case Competitions/' + pushId + '/status');
       var employerCasecompetitions = firebase.database().ref('Employer Case Competitions/' + empId +'/' + pushId + '/status');
       var categoryCasecompetitions = firebase.database().ref('Category Case Competitions/' + category +'/' +pushId + '/status');

           Competitionsref.set(1).then(function(){
                  
              employerCasecompetitions.set(1).then(function(){
               
                 categoryCasecompetitions.set(1).then(function(){
                        console.log("jjjj");
                      alert("Approved");
                      
                      window.history.back();  

                 }),function(error){
                  alert(error);
                 };

              }),function(error){
                  alert(error);
                 };

           }),function(error){
                  alert(error);
                 };


    }

  $(window).load(function(){

      'use strict';

 
       var adminApp=firebase.initializeApp(config);
       var database= adminApp.database();
       var databaseRef = database.ref();
	

   firebase.auth().onAuthStateChanged(onAuthStateChanged);
  


    $('#admin_login_btn').click(function(){
    
        signin();

      });


    $('#signout').click(function(){

      firebase.auth().signOut();
      location.href="login.html";

      });

    $('#back').click(function(){

      window.history.back();
 
      });

    $('#posted_recruitments').click(function(){
	
	    getpostedRecruitments();

      });

    $('#confirmed_recruitments').click(function(){
	
	    getConfirmedRecruitments();
     
      });

     $('#employers').click(function(){
  
       getEmployers();
     
      });

     $('#applications').click(function(){
  
       getapplications();

      });


     $('#competitions').click(function(){
  
       getCompetitions();

      });

      $('#approved_competitions').click(function(){
  
       getApprovedCompetitions();

      });

     $('#enquiries').click(function(){
	
       getEnquiries();

      });


     $('#contact_msg').click(function(){
 
       getContactMessages();
     
      });

     $('#users').click(function(){

      getUsers();

     });
   
 });      

 
 



 function onAuthStateChanged(user) {
  
     if(user && user.uid == 'NCkISwqa83UJBABuT30N9EGk40c2')
      {
         return;
      }

     else
     {
        firebase.auth().signOut;
	      location.href="../";
	      alert("You don't have permission")
     }

 } 
  

 function signin(){

  var email=$('#email').val();
  var password=$('#password').val();


  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  
   });

}






function getpostedRecruitments(){

    $("#posted_recruitments_table > tbody").empty();
    $("#enquiries_table > tbody").empty();

    var ref = firebase.database().ref('recruitments');

    hide();
     $('#posted_recruitments_table').css('display','block');

     var i=1;
  ref.once('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      var childKey = childSnapshot.key;
      var m = childSnapshot.val();
    
       if(childKey=="recruitmentCount"){
         return;
       }
  

           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.hr_name+ "</td>");
            tr.append("<td>" + m.company_name+ "</td>");
            tr.append("<td>" + m.job_title + "</td>");
            tr.append("<td>" + m.hr_email+ "</td>");
            tr.append("<td>" + m.hr_phone+ "</td>");
            tr.append("<td>" + m.vacancies + "</td>");
            tr.append("<td>" + m.job_description+ "</td>");
            tr.append("<td>" + m.post_date+ "</td>");
            tr.append("<td>" + m.last_date + "</td>");

            tr.append("<td><a href='confirm.html?"+childKey+"'>Confirm</a></td>");
        
                
            $('#posted_recruitments_tbody').append(tr);
            i++;
    });

  });

}


function hide(){

  $('#users_table').hide();
  $('#contact_msg_table').hide(); 
  $('#enquiries_table').hide();
  $('#posted_recruitments_table').hide();
  $('#applications_table').hide();
  $('#employers_table').hide();
  $('#competitions_table').hide();
  $('#approved_competitions_table').hide();
}


function getEmployers(){

    $("#employers_table > tbody").empty();
    

    hide();

  var employers=firebase.database().ref('Employers/');

  $('#employers_table').show();

   var i=1;

   employers.once('value', function(snapshot) {

     snapshot.forEach(function(childSnapshot) {
    
       var childKey = childSnapshot.key;
       var m = childSnapshot.val();
    
 
      

           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.company_name+ "</td>");
            tr.append("<td>" + m.contact_person+ "</td>");
            tr.append("<td>" + m.phone+ "</td>");
            tr.append("<td>" + m.mobile+ "</td>");
            tr.append("<td>" + m.email+ "</td>");
            tr.append("<td>" + m.company_type+ "</td>");
            /*tr.append("<td>" + m.industry_type + "</td>");*/
            tr.append("<td>" + m.city + "</td>");
            tr.append("<td>" + m.office_address+ "</td>");
            tr.append("<td>" + m.recruitmentCount+ "</td>");
            tr.append("<td>" + m.confirmedRecruitmentCount+ "</td>");
            tr.append("<td>" + m.applicationCount+ "</td>");

           

            $('#employers_tbody').append(tr);
        i++;

  });
});


}


function getDate(timeStamp){
    
    var d=new Date(timeStamp);
    var date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    return date;

}

function getTime(timeStamp){

  var date = new Date(timeStamp*1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

return formattedTime;

}


function getCompetitions(){

    $("#competitions_table > tbody").empty();
    

    hide();

  var competitions=firebase.database().ref('Case Competitions/');

  $('#competitions_table').show();

   var i=1;

   competitions.once('value', function(snapshot) {

     snapshot.forEach(function(childSnapshot) {
    
       var childKey = childSnapshot.key;
       var m = childSnapshot.val();
    
 
      if(m.status!=0){
        return;
      }

            
                       

           var tr;
           tr = $('<tr/>');
          
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.company_name+ "</td>");
            tr.append("<td>" + m.competition_name+ "</td>");
            tr.append("<td>" + m.category+ "</td>");
            tr.append("<td>" + getDate(m.presentTimeStamp)+ "</td>");
            tr.append("<td>" + getDate(m.startTimeStamp)+ "</td>");
            tr.append("<td>" + getDate(m.endTimeStamp) + "</td>");
            tr.append("<td><a href='competitionView.html?"+childKey+"'>View Details</a></td>");
          
           

            tr.append('<td><button onclick="approve_competition(\'' + childKey + '\',\'' + m.empId + '\',\'' + m.category + '\')" class="btn">Confirm</button></td>');

            $('#competitions_tbody').append(tr);
        i++;

  });
});


}




function getApprovedCompetitions(){

    $("#approved_competitions_table > tbody").empty();
    

    hide();

  var competitions=firebase.database().ref('Case Competitions/');

  $('#approved_competitions_table').show();

   var i=1;

   competitions.once('value', function(snapshot) {

     snapshot.forEach(function(childSnapshot) {
    
       var childKey = childSnapshot.key;
       var m = childSnapshot.val();
    
 
      if(m.status!=1){
        return;
      }

           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.company_name+ "</td>");
            tr.append("<td>" + m.competition_name+ "</td>");
            tr.append("<td>" + m.category+ "</td>");
            tr.append("<td>" + getDate(m.presentTimeStamp)+ "</td>");
            tr.append("<td>" + getDate(m.startTimeStamp)+ "</td>");
            tr.append("<td>" + getDate(m.endTimeStamp) + "</td>");
            tr.append("<td><a href='competitionView.html?"+childKey+"'>View Details</a></td>");
            
            

          

            $('#approved_competitions_tbody').append(tr);
        i++;

  });
});


}



function removeEmployer(uid){

   $('#modal-text').html('You are going to remove a Employer.<br/>Remove? <a href="main.html">Click Here to not Remove</a>If Confirm Click OK<br/>');
  $('#modal_alert').modal({background:"static"});

   var employerRef=firebase.database().ref('Employers/'+uid)

   employerRef.remove().then(function(){
   
         $('#model-text').html("Successfully Removed ");
        $('#modal_alert').modal({background:true});
   });
}


function getConfirmedRecruitments(){

    $("#posted_recruitments_table > tbody").empty();
    $("#enquiries_table > tbody").empty();

    hide();

  var confirmRecruiters=firebase.database().ref('Confirmed Recruitments/');

  $('#posted_recruitments_table').show();

   var i=1;

   confirmRecruiters.once('value', function(snapshot) {

     snapshot.forEach(function(childSnapshot) {
    
       var childKey = childSnapshot.key;
       var m = childSnapshot.val();
    
 
      if(childKey=="confirmedRecruitmentCount"){
         return;
        }

           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.hr_name+ "</td>");
            tr.append("<td>" + m.company_name+ "</td>");
            tr.append("<td>" + m.job_title + "</td>");
            tr.append("<td>" + m.hr_email+ "</td>");
            tr.append("<td>" + m.hr_phone+ "</td>");
            tr.append("<td>" + m.vacancies + "</td>");
            tr.append("<td>" + m.job_description+ "</td>");
            tr.append("<td>" + m.post_date+ "</td>");
            tr.append("<td>" + m.last_date + "</td>");

           tr.append("<td><a href='remove.html?"+childKey+"'>Remove</a></td>");

            $('#posted_recruitments_tbody').append(tr);
        i++;

  });
});


}


function getUsers(){
    
    $("#posted_recruitments_table > tbody").empty();
    $("#enquiries_table > tbody").empty();
    $("#users_table > tbody").empty();

   var ref = firebase.database().ref('users');
          
   hide();

  $('#users_table').show();

  var i=1;

  ref.once('value', function(snapshot) {

     snapshot.forEach(function(childSnapshot) {

        var childKey = childSnapshot.key;
        var m = childSnapshot.val();
        var gender;
        if(m.gender=="true"){
          gender="Male";
        }
        else{
          gender="Female";
        }

           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.name+ "</td>");
            tr.append("<td>" + gender+ "</td>");
            tr.append("<td>" + m.email+ "</td>");
            tr.append("<td>" + m.phone+ "</td>");
            tr.append("<td>" + m.city+ "</td>");
            tr.append("<td>" + m.education + "</td>");
            tr.append("<td>" + m.resume_title+ "</td>");
          

            tr.append("<td><a href='info.html?"+childKey+"'>View</a></td>");
        
                
            $('#users_tbody').append(tr);
        i++;

  });
});



}




function getEnquiries(){

   $("#posted_recruitments_table > tbody").empty();
   $("#enquiries_table > tbody").empty();

   hide();

  $('#enquiries_table').show();

	var ref=firebase.database().ref('enquiries');
   
     var i=1;
ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var m = childSnapshot.val();
    
 

           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.name+ "</td>");
            tr.append("<td>" + m.email+ "</td>");
            tr.append("<td>" + m.phone+ "</td>");
            tr.append("<td>" + m.query + "</td>");
           
       


            $('#enquiries_tbody').append(tr);
        i++;

  });
});




	}



function getapplications(){

  
   $("#applications_table > tbody").empty();

   hide();

  $('#applications_table').show();

  var ref=firebase.database().ref('Applications');
   
     var i=1;
ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var m = childSnapshot.val();

    if(childKey=="applicationCount"){
      return;
    }
    
     var status;
    if(m.status==0){
      status="Applied(Not Viewed)";
     }
     if(m.status==1){
       status="Viewed";
     }
     if(m.status==2){
      status="Accepted";
     }
     if(m.status==3){
      status="Rejected";
     }

           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.company_name+ "</td>");
            tr.append("<td>" + m.job_title+ "</td>");
            tr.append("<td>" + m.name+ "</td>");
            tr.append("<td>" + m.post_date + "</td>");
            tr.append("<td>" + status+ "</td>");

            tr.append("<td><a href='info.html?"+m.applierId+"'>View Applier Details</a></td>");
          

           
            $('#applications_tbody').append(tr);
        i++;

  });
});




  }

  function getContactMessages(){

   $("#contact_msg_table > tbody").empty();

   hide();

  $('#contact_msg_table').css('display','block');

  var ref=firebase.database().ref('contactUs');
   
     var i=1;

ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var m = childSnapshot.val();
    
 

            var tr;
            tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.name+ "</td>");
            tr.append("<td>" + m.email+ "</td>");
            tr.append("<td>" + m.phone+ "</td>");
            tr.append("<td>" + m.subject+ "</td>");
            tr.append("<td>" + m.message + "</td>");
           

           
            $('#contact_msg_tbody').append(tr);
        i++;

   });

 });

}
