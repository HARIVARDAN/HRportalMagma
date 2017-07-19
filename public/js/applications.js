
$(window).load(function(){'use strict';


});


function getapplications(){

var i=1;
setTimeout(function(){


var ref = firebase.database().ref('User Applications');
if(currentUID==null){
  alert("Slow Internet..Please try again");
  return;
}


ref.once('value', function(snapshot1) {

   if(snapshot1.hasChild(currentUID))
   {

        ref.child(currentUID).once('value',function(snapshot){
   
        snapshot.forEach(function(childSnapshot) {
   
         var childKey = childSnapshot.key;
         var m = childSnapshot.val();
        
       if(m==0 || m==1)
       {
          $('#noData_div').show();
          $('#loading1').hide();
    
         return;
       }

     
      $('#loading1').hide();
      $('#table_div').show();


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
            tr.append("<td>" + m.job_title + "</td>");
            tr.append("<td>" + m.company_name+ "</td>");
            tr.append("<td>" + m.post_date + "</td>");
            tr.append("<td>" + status + "</td>");
          
            tr.append("<td><a href='job-details.html?"+m.postId+"'>View</a>");
           
            $('#applications_tbody').append(tr);
        i++;

    });

   
  });
  
  }
  else{
       $('#loading1').hide();
       $('#noData_div').show();
    return;
  }


});

},5000);
}






