const { Schema, model } = require("mongoose");

const SummarySchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Summary", SummarySchema, "summaries");