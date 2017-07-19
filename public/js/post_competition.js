$(document).ready(function(){

$('#create_competition_mba_btn').click(function(){


   

	var p=createCompetition("mba");
	if(p){
		alert("Successful");
	}
	
});



function createCompetition(branch){
                   


    var competition_name=$('#competition_name').val();
    var startDate=$('#startDate').val();
    var startTime=$('#startTime').val();
    var endDate=$('#endDate').val();
    var endTime=$('#endTime').val();
    var organisation_type=$('#organisation_type').val();
    var organisation_name=$('#organisation_name').val();
    console.log(competition_name + startDate +organisation_type +organisation_name);

if(competition_name=="" || startTime=="" || startDate =="" || endTime == "" || endDate == "" || organisation_name == "" || organisation_type==""){
	alert("Please fill all Details");
	return false;
}
  // A post entry.
  var postData = {
   name : competition_name,
   startDate :startDate,
   startTime : startTime,
   endDate :endTime,
   endTime : endTime,
   organisation_name :organisation_name,
   organisation_type : organisation_type,
   branch :branch
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('Competitions').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/Competitions/' + newPostKey] = postData;
  updates['/Competitions branchwise/' + branch +'/'+ newPostKey] = postData;
  updates['/users/' + currentUID + '/' + '/Competitions/'+ newPostKey] = postData;

  return firebase.database().ref().update(updates);


  

}

});