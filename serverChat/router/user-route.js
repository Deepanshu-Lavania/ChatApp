import express from "express";
import { Signup, Login, Logout, getUserProfile } from "../controller/user-controller.js";
import authorisedMiddleware from "../middleware/authorisedMiddleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/getalluser", authorisedMiddleware, getUserProfile);

export default router;
