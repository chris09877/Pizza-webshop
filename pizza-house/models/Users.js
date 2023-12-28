const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: Object,
    email: String,
    password: String,
    username: String
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;