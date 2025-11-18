const mongoose = require("mongoose");

const ConsultancyChatSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
    response: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ConsultancyChat = mongoose.model('ConsultancyChat', ConsultancyChatSchema);
module.exports = { ConsultancyChat };
