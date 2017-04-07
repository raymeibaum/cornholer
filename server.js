const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:cornhole', function() {
  console.log('Database connected.')
});

const port = process.env.PORT || 3000
app.listen(port, function (){
  console.log(`Server listening on port: ${port}.`);
});
