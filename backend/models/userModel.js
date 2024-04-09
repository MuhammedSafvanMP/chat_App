const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    genter: {
        type: String,
        enum: ["male", "female", "gay"],
        required: true
    }

}, {timestamps: ture});

module.exports = mongoose.model("User", userModel)