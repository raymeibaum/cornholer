const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.static(__dirname + '/public'));

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const port = process.env.PORT;
app.listen(port, function (){
  console.log(`Server listening on port: ${port}.`);
});
