 var config = {
  apiKey: "AIzaSyBWhSdFyk14MFyqdPfv8148flACw1gCzTY",
    authDomain: "jcr-hr-solutions.firebaseapp.com",
    databaseURL: "https://jcr-hr-solutions.firebaseio.com",
    projectId: "jcr-hr-solutions",
    storageBucket: "jcr-hr-solutions.appspot.com",
    messagingSenderId: "951267740259"
  };

 
 $(window).load(function(){'use strict';


		firebase.initializeApp(config);

   firebase.auth().onAuthStateChanged(onAuthStateChanged);

   $('#admin_login_btn').click(function(){
    console.log("jj");
        signin();

   });
});



function onAuthStateChanged(user) {
  // We ignore token refresh events.

if(user){
  if (user.uid == 'NCkISwqa83UJBABuT30N9EGk40c2') {
  location.href="main.html";
}
else{
	location.href="../";
	alert("You don't have permission")
}

} 
  }



  function signin(){

  var email=$('#email').val();
  var password=$('#password').val();

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

}