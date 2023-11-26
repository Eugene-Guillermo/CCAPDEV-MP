$(document).ready(function () {

    $('#reg-button').prop('disabled', false);

    $('#email').keyup(function (){
        const email = $('#email').val();
        if(email.endsWith('@dlsu.edu.ph'))
        {
            const request = {email: email};
            $.ajax({
                url: '/EmailExists',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8', // Specify the content type
                data: JSON.stringify(request), // Convert data to JSON string
                success: function(response) {
                    if(response.length > 0) {
                        $('#email').css('background-color', '#FF8375');
                        $('#error1').text('An account with the email has been registered');
                        $('#reg-button').prop('disabled', true);
                    }
                    else {
                        $('#email').css('background-color', 'white');
                        $('#error1').text('');
                        $('#reg-button').prop('disabled', false);
                    }
                },
                error: function(error) {
                    alert(error);
                    console.error(error);
                }
            });
        }
        else
        {
            $('#email').css('background-color', '#FF8375');
            $('#error1').text('Email must be a DLSU email');
            $('#reg-button').prop('disabled', true);
        }
    });

    $('#pass').keyup(function (){
        const password = $('#pass').val();
        const password2 = $('#pass2').val();

        if(password == password2)
        {
            $('#pass').css('background-color', 'white');
            $('#pass2').css('background-color', 'white');
            $('#error2').text('');
            $('#reg-button').prop('disabled', false);
        }
        else
        {
            $('#pass').css('background-color', '#FF8375');
            $('#pass2').css('background-color', '#FF8375');
            $('#error2').text('Passwords do not match.');
            $('#reg-button').prop('disabled', true);
        }
    });

    $('#pass2').keyup(function (){
        const password = $('#pass').val();
        const password2 = $('#pass2').val();

        if(password == password2)
        {
            $('#pass').css('background-color', 'white');
            $('#pass2').css('background-color', 'white');
            $('#error2').text('');
            $('#reg-button').prop('disabled', false);
        }
        else
        {
            $('#pass').css('background-color', '#FF8375');
            $('#pass2').css('background-color', '#FF8375');
            $('#error2').text('Passwords do not match.');
            $('#reg-button').prop('disabled', true);
        }
    });

    $('#display').keyup(function(){
        const display = $('#display').val();
        const request = {display: display};

        $.ajax({
            url: '/DisplayExists',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8', // Specify the content type
            data: JSON.stringify(request), // Convert data to JSON string
            success: function(response) {
                if(response.length > 0) {
                    $('#display').css('background-color', '#FF8375');
                    $('#error3').text('Display Name has already been taken');
                    $('#reg-button').prop('disabled', true);
                }
                else {
                    $('#display').css('background-color', 'white');
                    $('#error3').text('');
                    $('#reg-button').prop('disabled', false);
                }
            },
            error: function(error) {
                alert(error);
                console.error(error);
            }
        });
    });
});

const reg_button = document.getElementById("reg-button");
reg_button.addEventListener("click", (e) =>
    {
        e.preventDefault();

        const user = {
            email: $('#email').val(),
            password: $('#pass').val(),
            display: $('#display').val()
        };
        alert(window.location.pathname);
        alert(JSON.stringify(user));

        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            contentType: 'application/json; charset=utf-8', // Specify the content type
            data: JSON.stringify(user), // Convert data to JSON string
            success: function(response) {
                // Parse and handle the response data
                const parsedData = JSON.parse(JSON.stringify(response));
                console.log('Parsed response data:', parsedData);

                alert(parsedData);

                if(parsedData.startsWith("You have successfully registered"))
                    window.location.href = '/';
            },
            error: function(error) {
                alert(error);
                console.error(error);
            }
        });
    }
)