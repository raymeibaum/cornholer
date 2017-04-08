const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const GameSchema = new Schema({
  winningUsers: [],
  losingUsers: []
});

const UserSchema = new Schema({
  username: String,
  passwordDigest: String,
  games: [GameSchema],
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
