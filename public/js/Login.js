const sign_button = document.getElementById("sign-button");
sign_button.addEventListener("click", (e) =>
    {
        e.preventDefault();
        
        const user = {
            email: $('#email').val(),
            password: $('#pass').val()
        };

        console.log(user);

        var url = '/Login';

        if (window.location.pathname == '/AdminLogin')
        {
            url = '/AdminLogin';
        }


        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8', // Specify the content type
            data: JSON.stringify(user), // Convert data to JSON string
            success: function(response) {
                // Parse and handle the response data
                const parsedData = JSON.parse(JSON.stringify(response));
                console.log('Parsed response data:', parsedData);

                alert(parsedData);

                if(parsedData.startsWith("Welcome, Admin"))
                {
                    window.location.href = '/AdminIndex';
                }
                else{
                    window.location.href = '/StudentInfo1';
                }
            },
            error: function(error) {
                const parsedData = JSON.parse(JSON.stringify(error));
                console.log('Parsed response data:', parsedData);
                alert(parsedData.responseText);
            }
        });
    }
)