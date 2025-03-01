import express from "express";
import { SendMessage, getMessage } from "../controller/message-controller.js"; 
import authorisedMiddleware from "../middleware/authorisedMiddleware.js";

const router = express.Router();

router.post("/send/:id", authorisedMiddleware, SendMessage);
router.get("/get/:id", authorisedMiddleware, getMessage);

export default router;