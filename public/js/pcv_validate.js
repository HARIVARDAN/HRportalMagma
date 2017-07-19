$(window).load(function(){

 $("#post-resume-form").validate({
    
        // Specify the validation rules
        rules: {
           full_name: "required",
           gender : "required",
            pcv_email: {
                required: true,
                email: true
            },
             pcv_phone: {
                required: true
            },
            pcv_city : "required",
             
             state : "required",
             resume_title : "required",

            job_industry: {
                required: true,
                minlength: 5
            },
            state : "required",
            tc : "required"
        },
        
        // Specify the validation error messages
        messages: {
            full_name: "Please enter your name",
            gender : "Please select your Gender",
            state : "Please enter your State",
            resume_title : "Please enter your Resume Title",
            pcv_email: "Please enter a valid email address",
            job_industry: "Please enter Job Industry",
            pcv_city :"Please enter your city",
            tc : "Please accept the Terms and Conditions"

        }

     });
});