const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();


app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({ secret: 'cornholeforever', resave: true, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const usersController = require('./server/controllers/users.js');
app.use('/api/users/:username', usersController);


const port = process.env.PORT;
app.listen(port, function (){
  console.log(`Server listening on port: ${port}.`);
});
