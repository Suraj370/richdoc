const express = require("express");
const router = express.Router();

const { signup, signin, signout } = require("../controllers/auth.controller");

const { verifyJWT } = require("../middlewares/authmiddleware");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", verifyJWT, signout);

module.exports = router;
