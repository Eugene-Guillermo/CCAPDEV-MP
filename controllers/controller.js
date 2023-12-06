const Date = require('../public/js/DateFormat.js');
const User = require('../models/User.js');
const Reservation = require('../models/Reservation.js');
const sha1 = require("sha1");

const controller = {
    getLogin: async function(req, res) {
        res.render('Login');
    },

    redirect: async function(req, res) {
        if (req.session.email)
        {
            const user = await User.findOne({email: req.session.email});
            if (user.account_type == 'Student')
            {
                res.redirect('/Index1');
            }
            else
            {
                res.redirect('/AdminIndex')
            }
        }
        else
        {
            res.redirect('/Login');
        }
    },

    getAbout: async function(req, res) {
        res.render('About');
    },

    postLogin: async function(req, res) {
        const email = req.body.email;
        console.log(req.session);
        const password = sha1(req.body.password);

        res.status(200);
        try {
            // Check credentials using the MongoDB model
            const user = await User.findOne({email: email, password: password});
            console.log(user);
    
            if (user) {
                req.session.email = user.email;
                console.log(req.session)
                res.send('Welcome, ' + user.display + '!');
            } else {
                res.status(400);
                res.send('Login Credentials Are Invalid');
            }
        } catch (error) {
            res.status(400);
            console.error(error);
            res.send("Error occured");
        }
    },

    getRegister: function(req, res) {
        res.render('Register');
    },

    postRegister: async function(req, res) {
        const email = req.body.email;
        const password = sha1(req.body.password);
        const display = req.body.display;

        console.log(req.body);
        res.status(200);
        try
        {
            User.create({email: email, password: password, display: display, account_type: 'Student'});
            res.send("You have successfully registered, " + display + "!");
        }
        catch (e)
        {
            console.error(e);
            res.status(400);
            res.send(e);
        }
        
    },

    postEmailExists: async function(req, res) {
        const email = req.body.email;

        console.log(req.body);
        console.log(email);
        const user = await User.find({email: email});

        res.json(user);
    },

    postDisplayExists: async function(req, res) {
        const display = req.body.display;

        const user = await User.find({display: display});

        res.json(user);
    },

    getAdminLogin: function(req, res) {
        res.render('AdminLogin');
    },

    postAdminLogin: async function(req, res) {
        console.log(req.body);
        const email = req.body.email;
        const password = sha1(req.body.password);

        try {
            // Check credentials using the MongoDB model
            const user = await User.findOne({email: email, password: password});
            console.log(user);
    
            if (user) {
                if (user.account_type == 'Admin')
                {
                    req.session.email = user.email;
                    res.status(200);
                    res.send('Welcome, Admin ' + user.display + '!');
                }
                else
                {
                    res.status(400);
                    res.send('Please login with an administrator account.');
                }
            } else {
                res.status(400);
                res.send('Login Credentials Are Invalid');
            }
        } catch (error) {
            res.status(400);
            console.error(error);
            res.send("Error occured");
        }
    },

    getStudentInfo: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});
        const reserver = user.display;

        const reservations = await Reservation.find({reserver: reserver});
        var formatted = JSON.parse(JSON.stringify(reservations));

        for (var i = 0; i < reservations.length; i++)
        {
            const day = reservations[i].reservationDate;
            formatted[i].reservationDate = Date.formatDate(day);
        }

        res.render('StudentInfo1', {display: user.display, account_type: user.account_type, reservations: formatted});
    },

    postCheckReservations: async function(req, res) {
        const reserver = req.body.reserver;

        const reservations = await Reservation.find({reserver: reserver});

        res.json(reservations);
    },

    getReservations: async function(req, res) {
        const reservations = await Reservation.find({reserver: {$ne:null}});

        res.json(reservations);
    },

    getStudentInfoEdit: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});
        const reservations = await Reservation.find({reserver: user.display});
        var formatted = JSON.parse(JSON.stringify(reservations));

        for (var i = 0; i < reservations.length; i++)
        {
            const day = reservations[i].reservationDate;
            formatted[i].reservationDate = Date.formatDate(day);
        }

        res.render('StudentInfoEdit', {display: user.display, account_type: user.account_type, reservations: formatted});
    },

    getGuestView: async function(req, res) {
        res.render('GuestView');
    },

    getGuestView2: async function(req, res) {
        const reservationDate = req.params.date;
        const reservationTime = req.params.time;

        const reservations = await Reservation.find({reservationDate: reservationDate, reservationTime: reservationTime});

        if (reservations.length == 0)
        {
            for (var i = 1; i <= 30; i++)
            {
                Reservation.create({seatNo: i, reservationDate: reservationDate, reservationTime: reservationTime});
            }
        }

        res.render('GuestView', {reservations: reservations});
    },

    getAdminIndex: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});

        res.render('AdminIndex', {display: user.display, account_type: user.account_type});
    },

    getAdminView: async function(req, res) {
        const reservations = await Reservation.find({reserver: {$ne:null}});
        var formatted = JSON.parse(JSON.stringify(reservations));

        for (var i = 0; i < reservations.length; i++)
        {
            const day = reservations[i].reservationDate;
            formatted[i].reservationDate = Date.formatDate(day);
        }
        
        res.render('AdminView', {reservations: formatted});
    },

    getAdminViewEdit: async function(req, res) {
        const reservations = await Reservation.find({reserver: {$ne:null}});
        var formatted = JSON.parse(JSON.stringify(reservations));

        for (var i = 0; i < reservations.length; i++)
        {
            const day = reservations[i].reservationDate;
            formatted[i].reservationDate = Date.formatDate(day);
        }
        
        res.render('AdminViewEdit', {reservations: formatted});
    },

    postAdminEdit: async function(req, res) {
        const reserver = req.body.reserver;

        const seatNo = req.body.seatNo;
        const reservationDate = req.body.reservationDate;
        const reservationTime = req.body.reservationTime;

        const origSeatNo = req.body.origSeatNo;
        const origReservationDate = req.body.origReservationDate;
        const origReservationTime = req.body.origReservationTime;

        try
        {
            const reservation = await Reservation.findOne({seatNo: origSeatNo, reservationDate: origReservationDate, reservationTime: origReservationTime});
            console.log(reservation);
            var newReservation = await Reservation.findOne({seatNo: seatNo, reservationDate: reservationDate, reservationTime: reservationTime});

            if (newReservation == null)
            {
                for (var i = 1; i <= 30; i++)
                {
                    Reservation.create({seatNo: i, reservationDate: reservationDate, reservationTime: reservationTime});
                }
            }

            newReservation = await Reservation.findOne({seatNo: seatNo, reservationDate: reservationDate, reservationTime: reservationTime});
            
            console.log(newReservation);
            if (newReservation?.reserver == null  || newReservation?.reserver == undefined)
            {
                reservation.reserver = undefined;
                reservation.save();

                newReservation.reserver = reserver;
                newReservation.save();

                res.send("You have successfully changed the reservation!");
                
            }
            else
            {
                res.status(400);
                res.send("This seat has already been reserved in this specific date and time.");
            }
        }
        catch(e)
        {
            res.status(400);
            console.log(e);
            res.send(e);
        }
    },

    postAdminDelete: async function(req, res) {
        const seatNo = req.body.seatNo;
        const reservationDate = req.body.reservationDate;
        const reservationTime = req.body.reservationTime;

        try
        {
            const reservation = await Reservation.findOne({seatNo: seatNo, reservationDate: reservationDate, reservationTime: reservationTime});
            reservation.reserver = undefined;
            reservation.save();

            res.send("You have successfully deleted the reservation!");
        }
        catch(e)
        {
            res.status(400);
            console.log(e);
            res.send(e);
        }
    },

    getIndex1: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});

        res.render('Index1', {display: user.display, account_type: user.account_type});
    },

    getIndex2: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});

        res.render('Index2', {display: user.display, account_type: user.account_type});
    },

    getLaboratory1: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});

        res.render('Laboratory1', {display: user.display, account_type: user.account_type});
    },

    getLaboratory2: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});

        const seatNo = req.params.seat;
        const reservationDate = req.params.date;
        const reservationTime = req.params.time;

        const reservations = await Reservation.find({reservationDate: reservationDate, reservationTime: reservationTime});

        if (reservations.length == 0)
        {
            for (var i = 1; i <= 30; i++)
            {
                Reservation.create({seatNo: i, reservationDate: reservationDate, reservationTime: reservationTime});
            }
        }

        res.render('Laboratory1', {display: user.display, account_type: user.account_type, seatNo: seatNo, reservations: reservations});
    },

    postReservation: async function(req, res) {
        const email = req.session.email;
        const user = await User.findOne({email: email});
        const seatNo = req.body.seatNo;
        const reservationDate = req.body.reservationDate;
        const reservationTime = req.body.reservationTime;
        
        const reservations = await Reservation.find({reservationDate: reservationDate, reservationTime: reservationTime});

        if (reservations.length == 0)
        {
            for (var i = 1; i <= 30; i++)
            {
                Reservation.create({seatNo: i, reservationDate: reservationDate, reservationTime: reservationTime});
            }
        }


        console.log(req.body.date);
        res.status(200);
        try
        {
            const reservation = await Reservation.findOne({seatNo: seatNo, reservationDate: reservationDate, reservationTime: reservationTime});
            if (reservation.reserver)
            {
                res.status(400);
                res.send("This seat has already been reserved in this specific date and time.");
            }
            else
            {
                const user = await User.findOne({email: email});
                reservation.reserver = user.display;
                reservation.save();
                res.send(user.display  + ", you have successfully reserved Seat Number " + seatNo + " for " + reservationDate + " at " + reservationTime + "!");
            }
        }
        catch (e)
        {
            console.error(e);
            res.status(400);
            res.send(e);
        }
    },

    postCheckReserver: async function(req, res) {
        const seatNo = req.body.seatNo;
        const reservationDate = req.body.reservationDate;
        const reservationTime = req.body.reservationTime;

        const reservation = await Reservation.findOne({seatNo: seatNo, reservationDate: reservationDate, reservationTime: reservationTime});

        res.json(reservation);
    },

    postRegistrationEdit: async function (req, res) {
        const seatNo = req.body.seatNo;
        const reservationDate = req.body.reservationDate;
        const reservationTime = req.body.reservationTime;

        const origSeatNo = req.body.origSeatNo;
        const origReservationDate = req.body.origReservationDate;
        const origReservationTime = req.body.origReservationTime;

        try
        {
            const reservation = await Reservation.findOne({seatNo: origSeatNo, reservationDate: origReservationDate, reservationTime: origReservationTime});
            console.log(reservation);
            var newReservation = await Reservation.findOne({seatNo: seatNo, reservationDate: reservationDate, reservationTime: reservationTime});

            if (newReservation == null)
            {
                for (var i = 1; i <= 30; i++)
                {
                    Reservation.create({seatNo: i, reservationDate: reservationDate, reservationTime: reservationTime});
                }
            }

            newReservation = await Reservation.findOne({seatNo: seatNo, reservationDate: reservationDate, reservationTime: reservationTime});

            console.log(newReservation);
            if (newReservation?.reserver == null  || newReservation?.reserver == undefined)
            {
                reservation.reserver = undefined;
                reservation.save();
                
                const email = req.session.email;
                const user = await User.findOne({email: email});

                newReservation.reserver = user.display;
                newReservation.save();

                res.send(user.display  + ", you have successfully changed your reservation!");
            }
            else
            {
                res.status(400);
                res.send("This seat has already been reserved in this specific date and time.");
            }
        }
        catch(e)
        {
            res.status(400);
            console.log(e);
            res.send(e);
        }
    },

    postRegistrationDelete: async function (req, res) {
        const seatNo = req.body.seatNo;
        const reservationDate = req.body.reservationDate;
        const reservationTime = req.body.reservationTime;

        try
        {
            const reservation = await Reservation.findOne({seatNo: seatNo, reservationDate: reservationDate, reservationTime: reservationTime});
            reservation.reserver = undefined;
            reservation.save();

            res.send("You have successfully changed your reservation!");
        }
        catch(e)
        {
            res.status(400);
            console.log(e);
            res.send(e);
        }
    },

    getEdit: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});

        res.render('Edit', {display: user.display, account_type: user.account_type});
    },

    getStudentInfo2: async function(req, res) {
        console.log(req.params.display);
        const display = req.params.display;
        const user = await User.findOne({display: display});

        const reservations = await Reservation.find({reserver: display});
        var formatted = JSON.parse(JSON.stringify(reservations));

        for (var i = 0; i < reservations.length; i++)
        {
            const day = reservations[i].reservationDate;
            formatted[i].reservationDate = Date.formatDate(day);
        }
        
        res.render('StudentInfo2', {display: user.display, account_type: user.account_type, reservations: formatted});
    },

    getUsers: async function(req, res) {
        const users = await User.find({});
        res.json(users);
    },

    deleteAccount: async function(req, res) {
        const email = req.session.email;
        const user = await User.findOne({email: email});
        console.log(user);
        const id = user._id;
        console.log(id);
        res.status(200);
        try{
            await User.findOneAndDelete({_id: id});
            res.send("Success")
        } catch (e){
            res.status(400);
            res.send(e);
        }
    },

    logoutAccount: async function(req, res) {
        req.session.email = null;
        res.redirect('/');
    },

    getExtendSession: function (req, res) {
        req.session.cookie.maxAge += 1000 * 60 * 60 * 24 * 7 * 3;
   }
}

module.exports = controller;
