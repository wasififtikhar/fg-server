const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = mongoose.Schema({
  email: String,
  password: String,
  user_name: String,
  friends: [{type: Schema.Types.ObjectId, ref: "Friends"}]
});

const UserModel = mongoose.model("Users", UsersSchema);

module.exports = UserModel;