const express = require("express");
const {summaryController,paragraphController,chatController,JsConverterController,ScifiimgController} = require("../controllers/openaiController");

const router = express.Router();

//Route
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatController);
router.post("/js-converter", JsConverterController);
router.post("/scifi-img", ScifiimgController);

module.exports= router;