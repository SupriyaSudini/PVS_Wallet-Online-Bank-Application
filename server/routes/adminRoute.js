const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const nodemailer = require('nodemailer');
const authMiddleware = require("../middlewares/authMiddleware");

// adminroute


// Get all users and admins
router.get("/usersadmins", async (req, res) => {
  try {
    const admins = await User.find({ role : "admin"});
    res.send({
      message: "Retrieved all admins successfully",
      data: admins,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false
    });
  }
});

// Update admin status
router.post("/update-admin-status", authMiddleware,  async(req, res) => {
  try{
    await User.findByIdAndUpdate(req.body.selectedAdmin, {
      isAdmin: req.body.isAdmin,
    });
    res.send({
      data: null,
      message: "Admin status Updated Successfully",
      success: true
    });
  }catch(error){
    res.send({
      data: error,
      message: error.message,
      success: false
    });
  }
});




module.exports = router;
