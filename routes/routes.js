const express = require('express');

const controller = require('../controllers/controller.js');

const app = express();

app.get('/', controller.redirect);
app.get('/Login', controller.getLogin);
app.post('/Login', controller.postLogin);
app.get('/Register', controller.getRegister);
app.post('/Register', controller.postRegister);
app.post('/EmailExists', controller.postEmailExists);
app.post('/DisplayExists', controller.postDisplayExists);
app.get('/AdminLogin', controller.getAdminLogin);
app.post('AdminLogin', controller.postAdminLogin);
app.get('/StudentInfo1/', controller.getStudentInfo);
app.get('/StudentInfoEdit', controller.getStudentInfoEdit);
app.get('/Index1', controller.getIndex1);
app.get('/Index2', controller.getIndex2);
app.get('/Laboratory1', controller.getLaboratory1);
app.get('/TimeSlot1', controller.getTimeSlot1);
app.get('/Edit', controller.getEdit);
app.get('/StudentInfo2/:display', controller.getStudentInfo2);
app.get('/StudentInfo3', controller.getStudentInfo3);
app.get('/GetUsers', controller.getUsers);
app.get('/DeleteAccount', controller.deleteAccount);
app.get('/LogoutAccount', controller.logoutAccount);

module.exports = app;
