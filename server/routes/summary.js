const express = require("express");
const SummaryController = require("../controllers/summary");

const router = express.Router();

// Ruta util
router.post("/crear", SummaryController.create);
router.get("/articulos/:ultimos?", SummaryController.list);
router.delete("/articulo/:id", SummaryController.deleteOne);
router.put("/articulo/:id", SummaryController.edit);

module.exports = router;
