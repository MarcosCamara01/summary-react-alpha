const express = require("express");
const router = express.Router();

const SummaryController = require("../controllers/summary");
const openaiHandler = require('../controllers/getSummary');

router.post("/summary", openaiHandler);
router.post("/crear", SummaryController.create);
router.get("/articulos/:ultimos?", SummaryController.list);
router.delete("/articulo/:id", SummaryController.deleteOne);
router.put("/articulo/:id", SummaryController.edit);

module.exports = router;
