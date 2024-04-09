const mongoose = require("mongoose");

const conversationModel = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
}, {timestamps: true});

module.exports = mongoose.model("conversation", conversationModel);