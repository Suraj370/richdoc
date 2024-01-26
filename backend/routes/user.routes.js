const express = require("express")
const router = express.Router()

const {
  getUser
} = require("../controllers/user.controller")

const {verifyJWT} = require('../middlewares/authmiddleware')


router.get('/getUser', verifyJWT, getUser )



module.exports = router