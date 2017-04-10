const express = require('express');
const router = express.Router();

const Game = require('../models/game.js');

router.get('/', function(req, res) {
  Game.find({})
    .exec(function(err, games) {
      if (err) {
        res.json({error: err});
      } else {
        res.json(games);
      }
    });
});

module.exports = router;
