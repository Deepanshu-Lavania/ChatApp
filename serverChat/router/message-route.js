const express = require("express");
const messageController = require("../controller/message-controller");
const authorisedMiddleware = require("../middleware/authorisedMiddleware");

const router = express.Router();

router.post("/send/:id",authorisedMiddleware,messageController.SendMessage);
router.get("/get/:id",authorisedMiddleware,messageController.getMessage);

module.exports =router;