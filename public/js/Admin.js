var origReservationDate = [];
var origReservationTime = [];
var origSeatNo = [];

$(document).ready(async function() {
    var amount = $('br').length;

    for(var i = 0; i < amount; i++)
    {
        const day = new Date( $('#reservationDate_' + i).val());
        origReservationDate.push(day.getFullYear() + '-' + (day.getMonth() + 1).toString().padStart(2, '0') + '-' + day.getDate().toString().padStart(2, '0'));

        for (var j = 0; j < 8; j++)
        {
            day.setDate(day.getDate() + 1);

            const formattedDate = day.getFullYear() + '-' + (day.getMonth() + 1).toString().padStart(2, '0') + '-' + day.getDate().toString().padStart(2, '0');
            $('#reservationDate_' + i).append($('<option value ="' + formattedDate + '">' + formattedDate + '</option>'));
        }

        var options = [
            "8:00 AM - 8:30 AM", "8:30 AM - 9:00 AM", "9:00 AM - 9:30 AM", "9:30 AM - 10:00 AM",
            "10:00 AM - 10:30 AM", "10:30 AM - 11:00 AM", "11:00 AM - 11:30 AM", "11:30 AM - 12:00 PM",
            "12:00 PM - 12:30 PM", "12:30 PM - 1:00 PM", "1:00 PM - 1:30 PM", "1:30 PM - 2:00 PM",
            "2:00 PM - 2:30 PM", "2:30 PM - 3:00 PM", "3:00 PM - 3:30 PM", "3:30 PM - 4:00 PM"
          ];
        origReservationTime.push($('#reservationTime_' + i + ' option').val());
        options.splice(options.indexOf(origReservationTime[i]), 1);

        

        for(var j = 0; j < options.length; j++)
        {
            $('#reservationTime_' + i).append($('<option value ="' + options[j] + '">' + options[j] + '</option>'));
        }


        origSeatNo.push($('#seatNo_' + i + ' option').val());
        
        for(var j = 1; j <= 30; j++)
        {
            if(j != origSeatNo[i])
            {
                $('#seatNo_' + i).append($('<option value ="' + j + '">Seat ' + j + '</option>'));
            }
        }

        $('#save_' + i).click(async function(){
            const i = this.id.split('_')[1];
            const reservation = { reserver: $('#reserver_' + i).text(),
                        origReservationDate: origReservationDate[i], origReservationTime: origReservationTime[i], origSeatNo: origSeatNo[i],
                        seatNo: $('#seatNo_' + i).val(), reservationDate: $('#reservationDate_' + i).val(), reservationTime: $('#reservationTime_' + i).val()};

            console.log(reservation);
                        
            await $.ajax({
                url: '/AdminEdit',
                type: 'POST',
                contentType: 'application/json; charset=utf-8', // Specify the content type
                data: JSON.stringify(reservation), // Convert data to JSON string
                success: function(response) {
                    // Parse and handle the response data
                    const parsedData = JSON.parse(JSON.stringify(response));
                    console.log('Parsed response data:', parsedData);
        
                    alert(parsedData);
                    window.location.href = '/AdminView';
                },
                error: function(error) {
                    const parsedData = JSON.parse(JSON.stringify(error));
                    console.log('Parsed response data:', parsedData);
                    alert(parsedData.responseText);
                }
            });
        });

        $('#delete_' + i).click(async function(){
            const i = this.id.split('_')[1];

            const reservation = {seatNo: $('#seatNo_' + i).val(), reservationDate: $('#reservationDate_' + i).val(), reservationTime: $('#reservationTime_' + i).val()};
                        
            await $.ajax({
                url: '/AdminDelete',
                type: 'POST',
                contentType: 'application/json; charset=utf-8', // Specify the content type
                data: JSON.stringify(reservation), // Convert data to JSON string
                success: function(response) {
                    // Parse and handle the response data
                    const parsedData = JSON.parse(JSON.stringify(response));
                    console.log('Parsed response data:', parsedData);
        
                    alert(parsedData);
                    window.location.href = '/AdminView';
                },
                error: function(error) {
                    const parsedData = JSON.parse(JSON.stringify(error));
                    console.log('Parsed response data:', parsedData);
                    alert(parsedData.responseText);
                }
            });
        });
    }

});