
 $(document).ready(function(){
 	$('#back_btn').click(function(){
 		location.href="../postedRecruitments.html";
 	});
 	$('#edit_btn').click(function(){
 		
 		var x = $(location).attr('search');
 		var pushId=x.substr(1);
 		location.href="edit.html?"+pushId;
 	});
 });


function setData(){


var x = $(location).attr('search');


if(x=="" || x==null){
	location.href="../home.html";
	return;
}
var pushId=x.substr(1);
var details;

console.log(pushId);
 var JobDetailsref = firebase.database().ref('recruitments/'+pushId);
  var JobDetailsref2=firebase.database().ref('Confirmed Recruitments/'+pushId);
  JobDetailsref.on("value",function(snapshot){
      details=snapshot.val();
   console.log(details);
      if(details=="" || details==null || details==undefined){
      	 JobDetailsref2.on("value",function(snapshot2){
      details2=snapshot2.val();
       if(details2==null || details2==""){
       		location.href="../home.html";
       	}else
      setValues(details2);
  });
      }

      else{
      	setValues(details);
      }

      
      

});
}



function setValues(details){
	  $('#contact_person').text(details.hr_name);
      $('#email').text(details.hr_email);
     $('#phone').text(details.hr_phone);
      $('#company_name').text(details.company_name);
      $('#website').text(details.website);
      $('#job_title').text(details.job_title);
      $('#last_date').text(details.last_date);
     $('#exp_month').text(details.exp_month);   
  $('#exp_year').text(details.exp_year);
      $('#vacancies').text(details.vacancies);
        $('#job_location').text(details.job_location);
     $('#about_company').text(details.about_company);
   $('#education').text(details.education);
     $('#salary').text(details.salary);
     $('#skills').text(details.skills);
     $('#job_description').text(details.job_description);
     $('#mobile').text(details.mobile);
     $('#industry_type').text(details.industry_type);
}