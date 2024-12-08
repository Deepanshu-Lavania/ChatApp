const express = require("express");
const routerLogic = require("../controller/user-controller");
const authorisedMiddleware = require("../middleware/authorisedMiddleware");

const router = express.Router();

router.post("/signup",routerLogic.Signup);
router.post("/login",routerLogic.Login);
router.post("/logout",routerLogic.Logout);
router.get("/getalluser",authorisedMiddleware,routerLogic.getUserProfile);

module.exports = router;