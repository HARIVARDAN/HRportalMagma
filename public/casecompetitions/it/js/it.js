$(document).ready(function(){
	
   function loadCompetitions(){
   console.log("jiljl");

     var ref=firebase.database().ref('Category Case Competitions/');
  
  
      
    ref.once('value', function(snapshot1) {

      if (snapshot1.hasChild('IT')){
        
         ref.child('IT').once('value', function(snapshot) {

          snapshot.forEach(function(childSnapshot) {
        
           var childKey = childSnapshot.key;
           var m = childSnapshot.val();
   
              if(m<1){
                 return;
              }
           
          var bgcolor,button_code=""; 
          var presentDate = new Date();
          var presentTimeStamp = new Date(presentDate).getTime();

          if(m.startTimeStamp <= presentTimeStamp && m.endTimeStamp >= presentTimeStamp){
                 
             bgcolor="notice notice-success";
           button_code='<button style="float:right;">Open</button>';  
              
            firebase.database().ref('Registrations/' + childKey).once('value', function(snapshot) {
                
                if (snapshot.hasChild(currentUID)) {
                        
                     button_code='<button style="float:right;">Open</button>';   
                 
                }

                else{

                   button_code =  '<p style="float : right">Time Out</p>';

                }
            });
            }

          else if(presentTimeStamp < m.startTimeStamp){
            bgcolor = "notice notice-warning";
          console.log("kkk");
            firebase.database().ref('Registrations/' + childKey).once('value', function(snapshot) {
                
                if (snapshot.hasChild(currentUID)) {
               console.log("jjj");
                  button_code =  '<p style="float : right">Registered</p>';

                }
                else{
             button_code='<button onclick="register(\'' + childKey + ',' + m.competition_name + '\')" class="btn" style="float: right;background-color: rgb(197,45,47);color: #fff;">Register</button>';
             console.log("jkkkj");
                 }
          });
               console.log(button_code);
          }  

          else if(presentTimeStamp > m.endTimeStamp){
            bgcolor = "notice notice-danger";
            button_code =  '<span style="float : right;font-size:20px;color:#000;">Ended</span>';
          }
            

          $('#it_competitions').append('<div class="' + bgcolor + '" style="width: 90%; margin-left: 5%;"><h2>'+ m.competition_name +' <a href="casecompetitions/competitionView.html?'+ childKey +' " style="float: right;">View Details</a></h2><p style="font-size: 16px;">'+ m.company_name +' </p><p style="color: green;padding-top: 1%; font-size:17px;"> From  &nbsp &nbsp'+ getDate(m.startTimeStamp) +  '&nbsp  -  &nbsp ' + getTime(m.startTimeStamp) + ' </p>' + button_code  +  '<p>  <span style="color: red;font-size:17px;">  To &nbsp &nbsp &nbsp &nbsp'+ getDate(m.endTimeStamp)  + ' &nbsp  - &nbsp ' +getTime(m.endTimeStamp)  + '</span></p></div>');
             
            

          
          
             
         });

        });

       }

       else
       {
        alert("No Competitions");
       }

     });    
          
   }


  function register(p,competition_name){

    if(currentUID == null || currentUID == ""){

       $('#modal-text').text("Please Sign In to Register for the Competition");
       $("#modal_alert").modal({backdrop: true});
     return;
        
     }

    else
    {
       firebase.database().ref('users/').once('value', function(snapshot) {

        if (snapshot.hasChild(currentUID)) {

    
         var presentDate = new Date();
         var presentTimeStamp = new Date(presentDate).getTime();

         var postData = {

           name :  global_username,
           timeStamp : presentTimeStamp,
           competition_name : competition_name,
           category : 'IT'

        };

 
         var updates = {};

         updates['/Registrations/' + p + '/'  + currentUID] = postData;
         updates['/User Registrations/' + currentUID + '/' + p] = postData;

        firebase.database().ref().update(updates).then(function(){

          alert("Registered");

        });

       }
       else{
               
              $('#modal-text').text("Please update your Profile to Register for the Competition");
               $("#modal_alert").modal({backdrop: true});

       }
     

     });

   }

 }

});