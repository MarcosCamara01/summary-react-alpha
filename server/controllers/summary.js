const Summary = require("../models/summary");

const create = async (req, res) => {
    let parameters = req.body;

    try {
        const summary = new Summary(parameters);
        const savedSummary = await summary.save();

        return res.status(200).json({
            status: "success",
            summary: savedSummary,
            message: "Summary successfully saved"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Summary has not been saved"
        });
    }
}

const list = async (req, res) => {
    let query = Summary.find({});

    if (req.params.ultimos) {
        query.limit(3);
    }

    try {
        const articles = await query.sort({ date: -1 }).exec();

        if (!articles || articles.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No articles found"
            });
        }

        return res.status(200).json({
            status: "success",
            count: articles.length,
            articles
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error when retrieving articles"
        });
    }
}


const deleteOne = async (req, res) => {
    let summaryId = req.params.id;

    try {
        const deletedSummary = await Summary.findOneAndDelete({ _id: summaryId });

        if (!deletedSummary) {
            return res.status(404).json({
                status: "error",
                message: "Summary not found"
            });
        }

        return res.status(200).json({
            status: "success",
            summary: deletedSummary,
            message: "Summary deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error when deleting summary"
        });
    }
}

const edit = async (req, res) => {
    let summaryId = req.params.id;

    try {
        const updatedSummary = await Summary.findOneAndUpdate({ _id: summaryId }, req.body, { new: true });

        if (!updatedSummary) {
            return res.status(404).json({
                status: "error",
                message: "Summary not found"
            });
        }

        return res.status(200).json({
            status: "success",
            summary: updatedSummary,
            message: "Summary updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error when updating summary"
        });
    }
}

module.exports = {
    create,
    list,
    deleteOne,
    edit
}
