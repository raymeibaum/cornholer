const express = require('express');
const router = express.Router();

const Game = require('../models/game.js');

router.get('/', function(req, res) {
  Game.find({})
    .exec(function(err, games) {
      if (err) {
        res.json({error: err});
      } else {
        res.json({games: games});
      }
    });
});

router.get('/:username', function(req, res) {
  Game.find({users: req.params.username})
    .exec(function(err, games) {
      if (err) {
        res.json({error: err})
      } else {
        res.json({games: games});
      }
    });
})

router.post('/', function(req, res) {
  const game = new Game(req.body);
  game.save();
  res.sendStatus(200);
});
module.exports = router;
