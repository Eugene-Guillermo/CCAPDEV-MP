const express = require('express');

const controller = require('../controllers/controller.js');

const app = express();

app.get('/', controller.redirect);
app.get('/Login', controller.getLogin);
app.get('/About', controller.getAbout);
app.post('/Login', controller.postLogin);
app.get('/Register', controller.getRegister);
app.post('/Register', controller.postRegister);
app.post('/EmailExists', controller.postEmailExists);
app.post('/DisplayExists', controller.postDisplayExists);
app.get('/AdminLogin', controller.getAdminLogin);
app.post('/AdminLogin', controller.postAdminLogin);
app.get('/StudentInfo1', controller.getStudentInfo);
app.get('/StudentInfoEdit', controller.getStudentInfoEdit);
app.get('/GuestView', controller.getGuestView);
app.get('/GuestView/:date/:time', controller.getGuestView2);
app.get('/AdminIndex', controller.getAdminIndex);
app.get('/AdminIndex/:seat/:date/:time', controller.getAdminIndex);
app.post('/AdminIndex', controller.postAdminIndex);
app.get('/AdminView', controller.getAdminView);
app.get('/AdminViewEdit', controller.getAdminViewEdit);
app.post('/AdminEdit', controller.postAdminEdit);
app.post('/AdminDelete', controller.postAdminDelete);
app.get('/Index1', controller.getIndex1);
app.get('/Laboratory1', controller.getLaboratory1);
app.get('/Laboratory1/:seat/:date/:time', controller.getLaboratory2);
app.post('/Laboratory1', controller.postReservation);
app.post('/CheckReserver', controller.postCheckReserver);
app.post('/CheckReservations', controller.postCheckReservations);
app.get('/getReservations', controller.getReservations);
app.post('/RegistrationEdit', controller.postRegistrationEdit);
app.post('/RegistrationDelete', controller.postRegistrationDelete)
app.get('/StudentInfo2/:display', controller.getStudentInfo2);
app.get('/GetUsers', controller.getUsers);
app.get('/DeleteAccount', controller.deleteAccount);
app.get('/LogoutAccount', controller.logoutAccount);
app.get('/ExtendSesesion', controller.getExtendSession);

module.exports = app;
