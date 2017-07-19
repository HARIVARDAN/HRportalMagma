
  
var empId,category;
  $(document).ready(function(){

     
     var x = $(location).attr('search');
     var pushId=x.substr(1);
   
    $('#approve_competition_btn').click(function(){
       
         approve_competition(pushId,empId,category);
     });

     



  });

 

   function loadProfile(){

var x = $(location).attr('search');
var details;
var pushId=x.substr(1);

 
var Competitionsref = firebase.database().ref('Case Competitions/');


Competitionsref.once('value', function(snapshot1) {

  if (snapshot1.hasChild(pushId))
  {
    
      
   Competitionsref.child(pushId).on("value",function(snapshot){
  
    details=snapshot.val();

    empId = details.empId;
    category = details.category;

    if(details.status>=1){
      $('#approve_competition_btn').hide();
    }
   
    $('#competition_name').text(details.competition_name);
    $('#about_competition').html(details.about_competitoin);
    $('#category').text(details.category);
    $('#rules').html(details.rules);
    $('#prizes').html(details.prizes);
    $('#startDate').text(getDate(details.startTimeStamp));
    $('#startTime').text(getTime(details.startTimeStamp));
    $('#endDate').text(getDate(details.endTimeStamp));
    $('#endTime').text(getTime(details.endTimeStamp));
    $('#questionView').attr('href',details.question_url);
    $('#company_name').text(details.company_name);
  

  });
}

 else{
  alert("No data found");
  location.href="main.html";
 }

});

}
