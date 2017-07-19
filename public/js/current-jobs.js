
$(window).load(function(){'use strict';


});


function getCurrentJobs(){

var i=1;


var ref = firebase.database().ref('Confirmed Recruitments');

ref.once('value', function(snapshot) {

if(snapshot.val()==null){
   
    $('#loading1').hide();
    $('#noData_div').show();
    return;
}
else{
  snapshot.forEach(function(childSnapshot) {
   
    var childKey = childSnapshot.key;
    var m = childSnapshot.val();
    console.log(m);
  if(m==0){
    $('#noData_div').show();
    $('#loading1').hide();
    
    return;
  }

 if(childKey=="confirmedRecruitmentCount"){
  return;
 }
  $('#loading1').hide();
  $('#table_div').show();
     var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.company_name+ "</td>");
            tr.append("<td>" + m.job_location + "</td>");
            tr.append("<td>" + m.vacancies + "</td>");
            tr.append("<td>" + m.post_date+ "</td>");
            tr.append("<td><a href='job-details.html?"+childKey+"'>View</a>");
           
            $('#current_jobs_tbody').append(tr);
        i++;



    // ...
  });
  

}

});


}






