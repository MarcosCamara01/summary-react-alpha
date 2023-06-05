const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema({
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

module.exports = model("Article", ArticleSchema, "articles");