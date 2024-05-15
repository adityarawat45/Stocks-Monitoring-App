const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://rawataditya193:stoxxx1234@cluster0.9trvpzb.mongodb.net/");



const UserSchema = new mongoose.Schema({
    userName: String,
    passWord: String,
    watchlists : [String]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
