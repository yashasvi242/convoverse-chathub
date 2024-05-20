const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { 
    accessChats,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
  } = require("../controllers/chatControllers");
const router = express.Router();

router.route('/').post(protect, accessChats);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/groupadd').put(protect, addToGroup);
router.route('/groupremove').put(protect, removeFromGroup);

module.exports = router;