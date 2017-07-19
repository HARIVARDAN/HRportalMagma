
  function register1(){

     $('#modal-text').html('Please <a href="login.html"> Sign In</a> to Register for the Competition');
     $("#modal_alert").modal({backdrop: true});

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
 
         var postData1 = {

           name :  global_username,
           timeStamp : presentTimeStamp,
           competition_name : competition_name,
           category : 'IT'

        };

 
         var updates = {};

         updates['/Registrations/' + p + '/'  + currentUID] = postData1;
         updates['/User Registrations/' + currentUID + '/' + p] = postData1;

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





 function loadCompetitions(){
 
     var ref=firebase.database().ref('Category Case Competitions/');
 
  
      
    ref.once('value', function(snapshot1) {
      

      if (snapshot1.hasChild('IT')){
        
         ref.child('IT').once('value', function(snapshot) {

          snapshot.forEach(function(childSnapshot){
        
           var childKey = childSnapshot.key;
           var m = childSnapshot.val();
      
              if(m<1){
                 return;
              }

              if(m.status==0)
                return;
           
          var bgcolor,button_code=""; 
          var presentDate = new Date();
          var presentTimeStamp = new Date(presentDate).getTime();

          if(m.startTimeStamp <= presentTimeStamp && m.endTimeStamp >= presentTimeStamp)
          {
                 
           bgcolor="notice notice-success";
          

           if(currentUID== null || currentUID=="")
            {
              button_code='<button onclick="register1()" class="btn" style="float: right;background-color: rgb(197,45,47);color: #fff;">Register</button>';
            }
            else
            {

               firebase.database().ref('Registrations/' + childKey).once('value', function(snapshot2) {
                
                  if (snapshot2.hasChild(currentUID)) 
                  {

                      firebase.database().ref('Submissions/' + childKey).once('value', function(snapshot3) {
                
                      if (snapshot3.hasChild(currentUID)) 
                       {
                        
                          button_code='<span style="float : right;font-size:20px;color:#000;">Submitted</span>';   
                   
                       }

                     else
                      {

                         button_code =  '<span style="float : right;font-size:20px;color:#000;">Registered</span>';

                      }

                      });

                   }

                   else
                  {

                     button_code='<button onclick="register(\'' + childKey + '\',\'' + m.competition_name + '\')" class="btn" style="float: right;background-color: rgb(197,45,47);color: #fff;">Register</button>';

                  } 

               });    

            }

         } 

          else if(presentTimeStamp < m.startTimeStamp)
          {
            bgcolor = "notice notice-warning";


             if(currentUID== null || currentUID=="")
            {
              button_code='<button onclick="register1()" class="btn" style="float: right;background-color: rgb(197,45,47);color: #fff;">Register</button>';
            }
            else
            {
           
            firebase.database().ref('Registrations/' + childKey).once('value', function(snapshot) {
                
                if (snapshot.hasChild(currentUID)) 
                {
              
                  button_code =  '<span style="float : right;font-size:20px;color:#000;">Registered</span>';

                }
                else
                {
                    
                  button_code='<button onclick="register(\'' + childKey + '\',\'' + m.competition_name + '\')" class="btn" style="float: right;background-color: rgb(197,45,47);color: #fff;">Register</button>';
                 
                 }
             });

          }
            
         }  

          else if(presentTimeStamp > m.endTimeStamp)
          {
            bgcolor = "notice notice-danger";
            button_code =  '<span style="float : right;font-size:20px;color:#000;">Ended</span>';
          }
            
            setTimeout(function(){
     
            $('#competitions').append('<div class="' + bgcolor + '" style="width: 90%; margin-left: 5%;"><h2>'+ m.competition_name +' <a href="casecompetitions/competitionView.html?'+ childKey +' " style="float: right;">View Details</a></h2><p style="font-size: 16px;">'+ m.company_name +' </p><p style="color: green;padding-top: 1%; font-size:17px;"> From  &nbsp &nbsp'+ getDate(m.startTimeStamp) +  '&nbsp  -  &nbsp ' + getTime(m.startTimeStamp) + ' </p>' + button_code  +  '<p>  <span style="color: red;font-size:17px;">  To &nbsp &nbsp &nbsp &nbsp'+ getDate(m.endTimeStamp)  + ' &nbsp  - &nbsp ' +getTime(m.endTimeStamp)  + '</span></p></div>');
             
             },1100);  
         });

        });

       }

       else
       {
        alert("No Competitions");
       }

     });    
          
   }