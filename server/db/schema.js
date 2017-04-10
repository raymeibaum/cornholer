const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const GameSchema = new Schema({
  winner: {
    users: Array,
    score: Number
  },
  loser: {
    users: Array,
    score: Number
  },
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
});

GameSchema.pre('save', function(next) {
  let now = new Date();
  this.timestamps.updatedAt = now;

  if (!this.timestamps.createdAt) {
    this.timestamps.createdAt = now;
  }
  next();
});

const UserSchema = new Schema({
  username: {
    type: String,
    unique: True
  },
  passwordDigest: String,
  telephone: Number,
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
});

UserSchema.pre('save', function(next) {
  let now = new Date();
  this.timestamps.updatedAt = now;

  if (!this.timestamps.createdAt) {
    this.timestamps.createdAt = now;
  }
  next();
});

const UserModel = mongoose.model('User', UserSchema);
const GameModel = mongoose.model('Game', GameSchema);

module.exports = {
  User: UserModel,
  Game: GameModel
}
