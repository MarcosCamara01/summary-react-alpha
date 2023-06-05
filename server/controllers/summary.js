const Summary = require("../models/Summary");

const create = (req, res) => {
    let parameters = req.body;

    const article = new Summary(parameters);

    article.save((error, savedArticle) => {
        if (error || !savedArticle) {
            return res.status(400).json({
                status: "error",
                message: "Article has not been saved"
            });
        }

        return res.status(200).json({
            status: "success",
            article: savedArticle,
            message: "Article successfully saved"
        });
    });
}

const list = (req, res) => {
    let query = Summary.find({});

    if (req.params.ultimos) {
        query.limit(3);
    }

    query.sort({ fecha: -1 }).exec((error, articles) => {
        if (error || !articles) {
            return res.status(404).json({
                status: "error",
                message: "No articles found"
            });
        }

        return res.status(200).send({
            status: "success",
            count: articles.length,
            articles
        });
    });
}

const deleteOne = (req, res) => {
    let articleId = req.params.id;

    Summary.findOneAndDelete({ _id: articleId }, (error, deletedArticle) => {
        if (error || !deletedArticle) {
            return res.status(500).json({
                status: "error",
                message: "Error when deleting"
            });
        }

        return res.status(200).json({
            status: "success",
            article: deletedArticle,
            message: "Delete method"
        });
    });
}

const edit = (req, res) => {
    let articleId = req.params.id;

    Summary.findOneAndUpdate({ _id: articleId }, req.body, { new: true }, (error, updatedArticle) => {
        if (error || !updatedArticle) {
            return res.status(500).json({
                status: "error",
                message: "Error updating"
            });
        }

        return res.status(200).json({
            status: "success",
            article: updatedArticle
        });
    });
}

module.exports = {
    create,
    list,
    deleteOne,
    edit
}
