$(document).ready(function () {
    $("#bo_user_login-form").validate({
        rules: {
            username: {
                required: true,
                alphanumeric: true,
                // pattern : /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\\.\\-]?[a-zA-Z0-9]+){0,1})\\.([A-Za-z]{2,})$/,
                rangelength: [4, 20]
            },
            password: {
                required: true,
                alphanumeric: true,
                rangelength: [4, 20]
            }
        },
        messages: {
            username: {
                required: "Please enter username",
                // pattern : 'The email address you entered is invalid',
                rangelength: "Your user name should be between 4 to 20 characters"
            },
            password: {
                required: "Please enter password",
                rangelength: "Your password should be between 4 to 20 characters"
            }
        }
    });
});