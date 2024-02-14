const mongoose = require("mongoose");

// to create the user Schema
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    pass: {type: String, required: true}

},{
    versionKey: false
})

const UserModel = mongoose.model("users", userSchema);

module.exports={
    UserModel
}