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

$('#reservationDate').ready(function() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    for (var i = 0; i < 8; i++)
    {
        var day = new Date(today);
        day.setDate(today.getDate() + i);

        const formattedDate = day.getFullYear() + '-' + (day.getMonth() + 1).toString().padStart(2, '0') + '-' + day.getDate().toString().padStart(2, '0');
        $('#reservationDate').append($('<option value ="' + formattedDate + '">' + day.toLocaleDateString() + '</option>'));
    }
});

$('#view_button').click(function(event) {
    event.preventDefault();

    window.location.href = "/Laboratory1/" + $('#seatNo').val() + "/" + $('#reservationDate').val() + "/" + $('#reservationTime').val();
});

$('#save_button').click(function(event) {
    event.preventDefault();

    const reservation = {
        seatNo: $('#seatNo').val(),
        reservationDate: $('#reservationDate').val(),
        reservationTime: $('#reservationTime').val()
    };

    alert(reservation.seatNo);

    $.ajax({
        url: '/Laboratory1',
        type: 'POST',
        contentType: 'application/json; charset=utf-8', // Specify the content type
        data: JSON.stringify(reservation), // Convert data to JSON string
        success: function(response) {
            // Parse and handle the response data
            const parsedData = JSON.parse(JSON.stringify(response));
            console.log('Parsed response data:', parsedData);

            alert(parsedData);
            window.location.href = "/Laboratory1/" + $('#seatNo').val() + "/" + $('#reservationDate').val() + "/" + $('#reservationTime').val();
        },
        error: function(error) {
            const parsedData = JSON.parse(JSON.stringify(error));
            console.log('Parsed response data:', parsedData);
            alert(parsedData.responseText);
        }
    });
});
var empty = 0;
var viewing = false;
$(document).ready(async function() {
    const link = window.location.pathname.split("/");

    var seatNo = link[2];
    const reservationDate = link[3];
    const reservationTime = decodeURIComponent(link[4]);


    for(var i = 1; i <= 30; i++)
    {
        seatNo = i;
        const reservation = {
            seatNo: Number(seatNo),
            reservationDate: reservationDate,
            reservationTime: reservationTime
        };
    
        await $.ajax({
            url: '/CheckReserver',
            type: 'POST',
            contentType: 'application/json; charset=utf-8', // Specify the content type
            data: JSON.stringify(reservation), // Convert data to JSON string
            success: function(response) {
                if(response != null)
                {
                    viewing = true;
                    if(response.reserver)
                    {
                        $('#seat_' + seatNo).html('<a href="/StudentInfo2/' + response.reserver + '">' + response.reserver + '</a>');
                        $('#seat_' + seatNo).css('background-color', 'pink');
                    }
                    else
                    {
                        $('#seat_' + seatNo).css('background-color', 'gray');
                        $('#seat_' + seatNo).text("N/A");
                        empty += 1;
                    }
                }
            },
            error: function(error) {
                const parsedData = JSON.parse(JSON.stringify(error));
                console.log('Parsed response data:', parsedData);
                alert(parsedData.responseText);
            }
        });
    }

    $('#seat_' + link[2]).css('background-color', 'orange');
    if(viewing == true)
    {
        $('#available').html("Date: " + reservationDate + "<br>Time: " + reservationTime + "<br>Available Seats: " + empty);
    }
    else
    {
        $('#available').text("Please select a timeslot first, and press view or reserve.")
    }
});
