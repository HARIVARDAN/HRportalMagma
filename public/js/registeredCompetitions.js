function getregisteredCompetitions(){

setTimeout(function(){

if(currentUID == null || currentUID ==""){

   $('#modal-text').html("Please <a href='login.html'> Login</a> to see your Submissions");
   $('#modal_alert').modal({'background' : true});
   window.history.back();
}

var i=1;

var ref = firebase.database().ref('User Registrations/' + currentUID + '/');

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
    
  if(m==0){
    $('#noData_div').show();
    $('#loading1').hide();
    
    return;
  }

  $('#loading1').hide();
  $('#table_div').show();
     var tr;
           tr = $('<tr/>');
           
            tr.append("<td>" + i + "</td>");
            tr.append("<td>" + m.competition_name+ "</td>");
            tr.append("<td>" + m.category + "</td>");
            tr.append("<td>" + getDate(m.timeStamp) + "</td>");
            tr.append("<td><a href='casecompetitions/competitionView.html?"+childKey+"'>View Details</a>");
           
            $('#registeredCompetitions_tbody').append(tr);
        i++;



    // ...
  });
  

}

});

},4000);

}