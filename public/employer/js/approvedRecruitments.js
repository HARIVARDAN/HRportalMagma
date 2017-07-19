function getapprovedRecruitments(){


setTimeout(function(){
  var i=1;




confirmedEmployerRecruitments.once('value', function(snapshot1) {
  if (snapshot1.hasChild(currentUID)){
    $('#loading').hide();
    $('#table_div').show();
confirmedEmployerRecruitments.child(currentUID).once('value', function(snapshot) {

  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var m = childSnapshot.val();
   
  

     var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.job_title+ "</td>");
            tr.append("<td>" + m.job_description+ "</td>");
            tr.append("<td>" + m.job_location + "</td>");
            tr.append("<td>" + m.vacancies + "</td>");
            tr.append("<td>" + m.post_date+ "</td>");
            tr.append("<td>" + m.last_date+ "</td>");
            tr.append("<td><a href='recruitment/view.html?"+childKey+"'>View</a> | <a href='recruitment/remove.html?"+childKey+"'>Remove</a>");
           
            $('#approvedRecruitments_tbody').append(tr);
        i++;


});
    // ...
  });
}
else{
   $('#loading').hide();
  $('#noData_div').show();
}

});
  
},1000);




}