function delete_account() {
    let text = "Are you sure you want to delete your account?"
    if(confirm(text) == true) {
        $.ajax({
            url: '/DeleteAccount',
            type: 'GET',
            contentType: 'application/json; charset=utf-8', // Specify the content type
            success: function(response) {
                const parsedData = JSON.parse(JSON.stringify(response));
                console.log('Parsed response data:', parsedData);

                if(parsedData.startsWith("Success"))
                {
                    alert("Account deleted.");
                    window.location.href = "/Login";
                }
            },
            error: function(error) {
                alert(error);
                console.error(error);
            }
        });
    }
}