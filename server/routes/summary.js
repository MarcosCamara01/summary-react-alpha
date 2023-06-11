const express = require("express");
const router = express.Router();

const SummaryController = require("../controllers/summary");
const openaiHandler = require('../controllers/getSummary');

router.post("/summary", openaiHandler);
router.post("/create", SummaryController.create);
router.get("/summaries/:last?", SummaryController.list);
router.get("/summary/:id", SummaryController.selectSummary);
router.delete("/summary/:id", SummaryController.deleteOne);
router.put("/summary/:id", SummaryController.edit);

module.exports = router;
