const { Schema, model } = require("mongoose");

const SummarySchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Summary", SummarySchema, "summaries");