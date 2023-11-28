const User = require('../models/User.js');
const sha1 = require("sha1");

const controller = {
    getLogin: async function(req, res) {
        res.render('Login');
    },

    redirect: function(req, res) {
        if (req.session.email)
        {
            res.redirect('/Index1');
        }
        else
        {
            res.redirect('/Login');
        }
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
        console.log(user);
        res.render('StudentInfo1', {display: user.display, account_type: user.account_type});
    },

    getStudentInfoEdit: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});

        res.render('StudentInfoEdit', {display: user.display, account_type: user.account_type});
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

    getTimeSlot1: async function(req, res) {
        const email = req.session.email;
        console.log("Session ID: " + {email: email});
        const user = await User.findOne({email: email});

        res.render('TimeSlot1', {email: email, display: user.display, account_type: user.account_type});
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
        console.log("Session ID: " + {display: display});
        const user = await User.findOne({display: display});
        
        res.render('StudentInfo2', {display: user.display, account_type: user.account_type});
    },

    getStudentInfo3: async function(req, res) {
        res.render('StudentInfo3');
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
    }
}

module.exports = controller;
