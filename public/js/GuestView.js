var empty = 0;
var viewing = false;
$(document).ready(async function() {
    const link = window.location.pathname.split("/");

    var seatNo = 0;
    const reservationDate = link[2];
    const reservationTime = decodeURIComponent(link[3]);


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

    if(viewing == true)
    {
        $('#available').html("Date: " + reservationDate + "<br>Time: " + reservationTime + "<br>Available Seats: " + empty);
    }
    else
    {
        $('#available').text("Please select a timeslot first, and press view.")
    }
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

    window.location.href = "/GuestView/" + $('#reservationDate').val() + "/" + $('#reservationTime').val();
});