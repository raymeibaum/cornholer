const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const GameSchema = new Schema({
  users: [String],
  winner: {
    users: [String],
    score: Number
  },
  loser: {
    users: [String],
    score: Number
  },
  timestamps: {
    createdAt: Date
  }
});

GameSchema.pre('save', function(next) {
  this.timestamps.createdAt = new Date();
  next();
});

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
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

const ListSchema = new Schema({
  user1: {
    username: String,
    telephone: Number
  },
  user2: {
    username: String,
    telephone: Number
  },
  timestamps: {
    createdAt: Date
  }
})

ListSchema.pre('save', function(next) {
  this.timestamps.createdAt = new Date();
  next();
});

const UserModel = mongoose.model('User', UserSchema);
const GameModel = mongoose.model('Game', GameSchema);
const ListModel = mongoose.model('List', ListSchema);

module.exports = {
  User: UserModel,
  Game: GameModel,
  List: ListModel
}
