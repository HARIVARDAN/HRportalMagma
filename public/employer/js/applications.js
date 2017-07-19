function getapplications(){


setTimeout(function(){
  var i=1;




applications.once('value', function(snapshot1) {
  console.log(snapshot1.val());

  if(snapshot1.val()==null){
    $('#loading').hide();
    $('#noData_div').show();
    return;
  }

  if (snapshot1.hasChild(currentUID)){
    $('#loading').hide();
    $('#table_div').show();


 applications.child(currentUID).once('value', function(snapshot) {

  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var m = childSnapshot.val();
    
     if(m.status==0){
      status="Applied";
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
            tr.append("<td>" + m.job_title+ "</td>");
            tr.append("<td>" + m.name+ "</td>");
            tr.append("<td>" + m.post_date+ "</td>");
            tr.append("<td><a href='recruitment/appview.html?"+m.applierId+"&"+childKey+"'>View Details</a></td>");
            tr.append("<td><a href='recruitment/view.html?"+m.postId+"'>View Post</a></td>");
            tr.append("<td>" + status+ "</td>");
           
           
            $('#applications_tbody').append(tr);
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