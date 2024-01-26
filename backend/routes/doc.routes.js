const express = require("express")
const router = express.Router()

const {
  createDoc, accessDoc, getDocuments, deletedoc
} = require("../controllers/doc.controller")

const {verifyJWT} = require('../middlewares/authmiddleware')


router.post('/createdoc', verifyJWT, createDoc)

router.put('/update/:documentId', accessDoc)

router.get('/:userId', verifyJWT, getDocuments)

router.delete('/deletedoc/:userId', verifyJWT, deletedoc)



module.exports = router