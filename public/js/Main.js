// Search User Modal
var modal = document.getElementById("modal_div");

var search_user_button = document.getElementById("search_user");

var back = document.getElementById("modal_back");

search_user_button.onclick = function() {
    modal.style.display = "flex";
};

back.onclick = function() {
    modal.style.display = "none";
}

$('#modal2').ready(function() {
    $('#modal2').css('display', 'flex');
});

$('#yes').click(function() {
    $('#modal2').css('display', 'none');
    $.ajax({
        url: '/ExtendSession',
        type: 'GET'
    });
});

$('#no').click(function() {
    $('#modal2').css('display', 'none');
    
});

$('#user_dropdown').ready(function() {
    $.ajax({
        url: '/GetUsers',
        type: 'GET',
        success: function(response) {
            // Parse and handle the response data
            const parsedData = JSON.parse(JSON.stringify(response));
            console.log('Parsed response data:', parsedData);
            for (var i = 0; i < parsedData.length; i++)
            {
                $('#user_dropdown').append($('<option value ="' + parsedData[i].display + '">' + parsedData[i].display + '</option>'));
            }
        },
        error: function(error) {
            const parsedData = JSON.parse(JSON.stringify(error));
            console.log('Parsed response data:', parsedData);
            alert(parsedData.responseText);
        }
    });
});

$('#search_profile').click(function() {
    var user = document.getElementById("user_dropdown");
    var value = user.value;
    var text = user.options[user.selectedIndex].text;
    window.location.href = '/StudentInfo2/' + text; 
});