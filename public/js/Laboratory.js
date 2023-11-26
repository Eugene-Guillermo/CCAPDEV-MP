function reserve_alert() {
    if($(".toggled").length == 0) {
        alert("No selected timeslots.")
    }
    else {
        alert("Successfully reserved!");
        window.location.href = "/Laboratory1";
    }
    
}

function reserve(element) {
    if(element.classList.contains("reservedByUser")) {
        alert("Timeslot already reserved!")
    }
    else {
        element.classList.toggle("toggled");
        if($(".toggled").length > 0) {
            document.getElementById("save_button").disabled = false;
        }
        else {
            document.getElementById("save_button").disabled = true;
        }
    }
}

function edit() {
    if($(".reservedByUser").length == 0) {
        alert("You have no reserved timeslots.")
    }
    else {
        window.location.href = "/Edit";
    }
}

function remove_alert() {
    if($(".toggled").length == 0) {
        alert("No selected timeslots.")
    }
    else {
        alert("Successfully removed resevations!");
        window.location.href = "/Laboratory1";
    }
    
}

function remove(element) {
    if(element.classList.contains("reservedByUser")) {
        element.classList.toggle("toggled");
        if($(".toggled").length > 0) {
            document.getElementById("save_button").disabled = false;
        }
        else {
            document.getElementById("save_button").disabled = true;
        }
    }
    else {
        alert("Timeslot not reserved!")
    }
}

function login_prompt() {
    alert("Login required. Redirecting you to login page now...");
    window.location.href = "/Login";
}

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