 
var createdCompetitions = [];
var approvedCompetitions =[];
var ongoingCompetitions = [];
var completedCompetitions = [];
var resultedCompetitions = [];

   function caseCompetitions(){

var presentDate = new Date();
var presentTimeStamp = new Date(presentDate).getTime();




setTimeout(function(){

 var competitions=firebase.database().ref('Employer Case Competitions/' + currentUID);
   var i=1;

   competitions.once('value', function(snapshot) {

     snapshot.forEach(function(childSnapshot) {
    
       var childKey = childSnapshot.key;
       var m = childSnapshot.val();

        m.id=childKey;

        if(m.status == 0){
        	createdCompetitions.push(m);
         }

        

         if(presentTimeStamp>= m.startTimeStamp && presentTimeStamp <=m.endTimeStamp && m.status == 1){
         	ongoingCompetitions.push(m);
         }

         if(m.status == 1 && presentTimeStamp < m.startTimeStamp){
         	approvedCompetitions.push(m);
         }

         if(presentTimeStamp > m.endTimeStamp){
         	completedCompetitions.push(m);
         }

      });
    

      $('#approvedCompetitionsCount').text(approvedCompetitions.length);
      $('#ongoingCompetitionsCount').text(ongoingCompetitions.length);  
      $('#completedCompetitionsCount').text(completedCompetitions.length);
      $('#createdCompetitionsCount').text(createdCompetitions.length);
    });

  },750);

 } 


$(document).ready(function(){

   $('#createdCompetitons_btn').click(function(){

      createdCompetitons_fn();

     });

   $('#created_tab').click(function(){

      createdCompetitons_fn();

     });
      

   	function createdCompetitons_fn(){

   		hide();	

   		$("#createdcompetitions_table > tbody").empty();

        $('#main_container').hide();
     	$('#createdcompetitions_container').show();
     	$('#sidebar').show();
     	$('#created_tab').addClass('active');

     
      if(createdCompetitions.length==0){

          $('#createdloading').hide();
         $('#creatednoData_div').show();
         return;
       }
  
    for(var i=0; i<createdCompetitions.length; i++)
            
     {
        
           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i+1 + "</td>");
            tr.append("<td>" +  createdCompetitions[i].competition_name+ "</td>");
            tr.append("<td>" +  createdCompetitions[i].category+ "</td>");
            tr.append("<td>" +  getDate(createdCompetitions[i].presentTimeStamp) + "</td>");
            tr.append("<td>" +  getDate(createdCompetitions[i].startTimeStamp) + "</td>");
            tr.append("<td>" +  getDate(createdCompetitions[i].endTimeStamp)+ "</td>");
            tr.append("<td><a href='casecompetitions/view.html?"+createdCompetitions[i].id+"'>View</a>");
           
            $('#createdCompetitions_tbody').append(tr);
    
      }

        $('#createdloading').hide();
        $('#created_table_div').show();

    }


   $('#approvedCompetitons_btn').click(function(){
  
       approvedCompetitions_fn();

   });

  $('#approved_tab').click(function(){
  
       approvedCompetitions_fn();

   });




   	function approvedCompetitions_fn(){

   		hide();	

   		$("#approvedcompetitions_table > tbody").empty();

        $('#main_container').hide();
     	$('#approvedcompetitions_container').show();
     	$('#sidebar').show();
     	$('#approved_tab').addClass('active');

      if(approvedCompetitions.length==0){
          $('#approvedloading').hide();
         $('#approvednoData_div').show();
         return;
       }
  
     for(var i=0; i<approvedCompetitions.length; i++)
            
      {
        
           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i+1 + "</td>");
            tr.append("<td>" +  approvedCompetitions[i].competition_name+ "</td>");
            tr.append("<td>" +  approvedCompetitions[i].category+ "</td>");
            tr.append("<td>" +  getDate(approvedCompetitions[i].presentTimeStamp) + "</td>");
            tr.append("<td>" +  getDate(approvedCompetitions[i].startTimeStamp) + "</td>");
            tr.append("<td>" +  getDate(approvedCompetitions[i].endTimeStamp)+ "</td>");
            tr.append("<td><a href='casecompetitions/view.html?"+approvedCompetitions[i].id+"'>View</a>");
            tr.append('<button onclick="registrations(\'' + approvedCompetitions[i].id   + '\',\'' + approvedCompetitions[i].competition_name  + '\')" class="btn" style="background-color: rgb(197,45,47);color: #fff;">Registrations</button>');
            $('#approvedCompetitions_tbody').append(tr);
    
      }

        $('#approvedloading').hide();
        $('#approved_table_div').show();

    }


     $('#ongoingCompetitons_btn').click(function(){

          ongoingCompetitions_fn();

       });
       
        $('#ongoing_tab').click(function(){

          ongoingCompetitions_fn();

       });


     	function ongoingCompetitions_fn(){

     		hide();	
     		$("#ongoingcompetitions_table > tbody").empty();

        $('#main_container').hide();
     	$('#ongoingcompetitions_container').show();
     	$('#sidebar').show();
     	$('#ongoing_tab').addClass('active');

      if(ongoingCompetitions.length==0){
         $('#ongoingloading').hide();
         $('#ongoingnoData_div').show();
         return;
       }
  
     for(var i=0; i<ongoingCompetitions.length; i++)
            
      {
        
           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i+1 + "</td>");
            tr.append("<td>" +  ongoingCompetitions[i].competition_name+ "</td>");
            tr.append("<td>" +  ongoingCompetitions[i].category+ "</td>");
            tr.append("<td>" +  getDate(ongoingCompetitions[i].presentTimeStamp) + "</td>");
            tr.append("<td>" +  getDate(ongoingCompetitions[i].startTimeStamp) + "</td>");
            tr.append("<td>" +  getDate(ongoingCompetitions[i].endTimeStamp)+ "</td>");
            tr.append("<td><a href='casecompetitions/view.html?"+ongoingCompetitions[i].id+"'>View</a>");
            tr.append('<td><button onclick="registrations(\'' + ongoingCompetitions[i].id  + '\',\'' + ongoingCompetitions[i].competition_name + '\')" class="btn" style="background-color: rgb(197,45,47);color: #fff;">Registrations</button></td>');
            tr.append('<td><button onclick="submissions(\'' + ongoingCompetitions[i].id + '\',\'' + ongoingCompetitions[i].competition_name + '\')" class="btn" style="background-color: rgb(197,45,47);color: #fff;">Submissions</button></td>');
            $('#ongoingCompetitions_tbody').append(tr);
    
      }

        $('#ongoingloading').hide();
        $('#ongoing_table_div').show();

    }


      

     $('#completedCompetitons_btn').click(function(){

        completedCompetitions_fn();


      });  

      $('#completed_tab').click(function(){

        completedCompetitions_fn();

      }); 

    function completedCompetitions_fn(){ 

       hide();	
       $("#completedcompetitions_table > tbody").empty();

        $('#main_container').hide();
     	$('#completedcompetitions_container').show();
     	$('#sidebar').show();
     	$('#completed_tab').addClass('active');

      if(completedCompetitions.length==0){
         $('#completedloading').hide();
         $('#completednoData_div').show();
         return;
       }
  
     for(var i=0; i<completedCompetitions.length; i++)
            
      {
        
           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i+1 + "</td>");
            tr.append("<td>" +  completedCompetitions[i].competition_name+ "</td>");
            tr.append("<td>" +  completedCompetitions[i].category+ "</td>");
            tr.append("<td>" +  getDate(completedCompetitions[i].presentTimeStamp) + "</td>");
            tr.append("<td>" +  getDate(completedCompetitions[i].startTimeStamp) + "</td>");
            tr.append("<td>" +  getDate(completedCompetitions[i].endTimeStamp)+ "</td>");
            tr.append("<td><a href='casecompetitions/view.html?"+completedCompetitions[i].id+"'>View</a>");
            tr.append('<td><button onclick="registrations(\'' + completedCompetitions[i].id  + '\',\'' + completedCompetitions[i].competition_name + '\')" class="btn" style="background-color: rgb(197,45,47);color: #fff;">Registrations</button></td>');
            tr.append('<td><button onclick="submissions(\'' + completedCompetitions[i].id + '\',\'' + completedCompetitions[i].competition_name + '\')" class="btn" style="background-color: rgb(197,45,47);color: #fff;">Submissions</button></td>');
            $('#completedCompetitions_tbody').append(tr);
 
      }

        $('#completedloading').hide();
        $('#completed_table_div').show();

    }
});

function registrations(competition_id,competition_name){

	  hide2();
   $('#registrationsnoData_div').hide();
   $("#registrations_table > tbody").empty();
   $("#registrations_table").hide();
   $('#registrations_container').show();
   $('#registrationsloading').show();

     var ref = firebase.database().ref('Registrations/');

 
   ref.once('value', function(snapshot1) {

   	if(snapshot1.hasChild(competition_id))

    {		
      
   
    
     ref.child(competition_id).once('value', function(snapshot) {

     var i=1;	

     snapshot.forEach(function(childSnapshot) {


       var childKey = childSnapshot.key;
       var m = childSnapshot.val();	
  
     

      $('#registrations_competition_name').text(m.competition_name + "  Competition Registrations");
           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" +  m.name+ "</td>");
            tr.append("<td>" +  getDate(m.timeStamp) + "</td>");
            tr.append("<td><a href='recruitment/regview.html?"+childKey+"'>View Details</a>");

            $("#registrations_table").show();
            $('#registrations_tbody').append(tr);
 
          
          $('#registrationsloading').hide();
          $('#registrations_table_div').show();


        });  

       }); 

     }
     
     else
     {
           $('#registrationsloading').hide();
           $('#registrationsnoData_div').show();
     }

  });        
}


 
 function hide(){

 	  	$('#completedcompetitions_container').hide();
 	    $('#ongoingcompetitions_container').hide();
 	    $('#createdcompetitions_container').hide();
 	    $('#approvedcompetitions_container').hide();
 	    $('#submissions_container').hide();
 	    $('#registrations_container').hide();

 	    $('#created_tab').removeClass();
 	    $('#approved_tab').removeClass();
      $('#ongoing_tab').removeClass();
      $('#completed_tab').removeClass();
 }

 function hide2(){

 	  	$('#completedcompetitions_container').hide();
 	    $('#ongoingcompetitions_container').hide();
 	    $('#createdcompetitions_container').hide();
 	    $('#approvedcompetitions_container').hide();

 	     $('#submissions_container').hide();
 	     $('#registrations_container').hide();

       $('#submissions_competition_name').text("Submissions");
       $('#registrations_competition_name').text("Registrations");

 	   } 
function submissions(competition_id,competition_name){

	  hide2();

   $('#submissionsnoData_div').hide();
   $("#submissions_table > tbody").empty();
   $("#submissions_table").hide();
   $('#submissions_container').show();
   $('#submissionsloading').show();

$("#submissions_table > tbody").empty();

     var ref = firebase.database().ref('Submissions/');


   ref.once('value', function(snapshot1) {
   

   	if(snapshot1.hasChild(competition_id))

    {		
   
    
     ref.child(competition_id).once('value', function(snapshot) {

     var i=1;	

     snapshot.forEach(function(childSnapshot) {


       var childKey = childSnapshot.key;
       var m = childSnapshot.val();	
  
      $('#submissions_container').show();

      $('#submissions_competition_name').text(competition_name + "  Competition Submissions");
           var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" +  m.name+ "</td>");
            tr.append("<td>" +  getDate(m.timeStamp) + "</td>");
            tr.append("<td><a href='recruitment/regview.html?"+childKey+"'>View Details</a>");
            tr.append("<td><a href='"+ m.solution_url +"' target=_blank>View Solution</a></td>");
     
            $("#submissions_table").show();
            $('#submissions_tbody').append(tr);
 
      
          $('#submissionsloading').hide();
          $('#submissions_table_div').show();


        });  

       }); 

     }
     
     else
     {
           $('#submissionsloading').hide();
           $('#submissionsnoData_div').show();
     }

  });        
}

