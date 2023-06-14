const express = require("express");
const router = express.Router();

const SummaryController = require("../controllers/summary");
const openaiHandler = require('../controllers/getSummary');
const check = require("../middlewares/auth");

router.post("/summary", openaiHandler);
router.post("/create", check.auth, SummaryController.create);
router.get("/summaries/:id", check.auth, SummaryController.list);
router.get("/summary/:id", check.auth, SummaryController.selectSummary);
router.delete("/summary/:id", check.auth, SummaryController.deleteOne);
router.put("/summary/:id", check.auth, SummaryController.edit);

module.exports = router;
