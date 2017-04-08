const express = require('express');
const app = express();
const logger = require('morgan');

require('dotenv').config();


app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const usersController = require('./server/controllers/users.js');
app.use('/api/users/:username', usersController);


const port = process.env.PORT;
app.listen(port, function (){
  console.log(`Server listening on port: ${port}.`);
});
