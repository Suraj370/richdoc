const asyncHandler = require("../utils/asyncHandler");
const User = require("../model/user.model");
const Document = require("../model/document.model");

const createDoc = asyncHandler(async (req, res) => {
  try {
    const uid = req.user._id;
    const { title, content } = req.body;
    
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newdoc = await Document.create({
      title,
      content,
      createdBy: uid,
      access: [{ user: uid, read: true, write: true }],
    });
    user.documents.push(newdoc._id);
    await user.save({ validateBeforeSave: false });
    res.status(201).json({
      success: true,
      document: newdoc,
      message: "Document created sucessfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

async function getDocuments(req, res) {
  try {
    const userId = req.params.userId;

    // Fetch documents where createdBy is the specified user ID
    const documents = await Document.find({ createdBy: userId });

    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


const deletedoc = async(req, res) => {
  try {
    const documentId = req.body.documentId
    const userId = req.params.userId;

    // Find the document by ID and delete it
    await Document.findByIdAndDelete(documentId);
    await User.findByIdAndUpdate(userId, { $pull: { documents: documentId } });

    

    res.status(204).send(); // 204 No Content indicates successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



const accessDoc =asyncHandler(async(req, res) => {
  try {
    const uid = req.user._id
    const { userId, read, write } = req.body;
    const documentId = req.params.documentId;


    // Check if the document exists
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (document.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Permission denied. You are not the owner of this document." });
    }

    const accessIndex = document.access.findIndex((access) => access.user.toString() === userId);
    if (accessIndex !== -1) {
      document.access[accessIndex].read = read || document.access[accessIndex].read;
      document.access[accessIndex].write = write || document.access[accessIndex].write;
    } else {
      document.access.push({ user: userId, read: read || false, write: write || false });
    }

    const updatedDocument = await document.save();

    res.status(200).json({ message: "Access control updated successfully", document: updatedDocument });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})
module.exports = {createDoc, accessDoc, getDocuments, deletedoc}