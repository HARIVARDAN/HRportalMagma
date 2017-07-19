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

     

    $('#question_iframe').attr('src',details.question_url);
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
    
  
   });
  
}

 else{
  alert("No data found");
  location.href="../home.html";
 }

});

}