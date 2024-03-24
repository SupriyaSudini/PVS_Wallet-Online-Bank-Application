const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");


// Update user info
router.post("/edit/update-user-info", authMiddleware, async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the request body
        const { firstName, lastName, email, phoneNumber, identificationType, identificationNumber, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.body.selectedUser, {
            firstName,
            lastName,
            email,
            phoneNumber,
            identificationType,
            identificationNumber,
            address,
        }, { new: true }); // { new: true } to return the updated document
        console.log("Updated User:", updatedUser); // Log the updated user
        res.send({
            message: "User info updated successfully",
            data: updatedUser,
            success: true,
        });
    } catch (error) {
        console.error("Error updating user info:", error); // Log any errors
        res.send({
            message: error.message,
            success: false,
        });
    }
});



module.exports = router;
