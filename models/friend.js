const { bool } = require("joi");
const mongoose = require("mongoose");

const FriendsSchema = mongoose.Schema({
  friend_name: String,
  friend_contact: String,
  friend_address: String,
  friend_type: String,
  isArchived: Boolean
});

const FriendsModel = mongoose.model("Friends", FriendsSchema);

module.exports = FriendsModel;