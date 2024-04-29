const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
// for encrypting user password we have to use bcryptjs
const bcrypt = require("bcryptjs");
// for generating token
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const nodemailer = require('nodemailer');

//register user account
router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "User already exits",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    // create new user
    const newUser = new User(req.body);
    await newUser.save(); // save user
    res.send({
      message: "User created Successfully",
      data: null, // we should not send the password to fron-end
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// login user account
router.post("/login", async (req, res) => {
  try {
    // check if user exits or not
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exits",
      });
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); // comparing the entered password with the password in user schema
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }

    // check user is verified or not
    if (!user.isVerified) {
      return res.send({
        success: false,
        message: "User is not verified yet or has been suspended",
      });
    }

  
    // generate token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "2d",
    });
    res.send({
      message: "User logged in Successfully",
      data: token,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// get user info
router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = " "; // we should not send password to frontend (so send this)
    res.send({
      message: "User info fetched successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// get all users
router.get("/get-all-users", authMiddleware, async(req, res) => {
    try{
      const users = await User.find();
      res.send({
        message: "Users fetched Successfully",
        data: users,
        success: true
      })
    }catch(error){
      res.send({
        message: error.message,
        success: false
      });
    }
});

// update verified user status
router.post("/update-user-verified-status", authMiddleware, async(req, res) => {
    try{
      await User.findByIdAndUpdate(req.body.selectedUser,{
        isVerified: req.body.isVerified,
      });
      res.send({
        data: null,
        message: "User Verified status Updated Successfully",
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

// forgot password
// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if the user with the given email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.send({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Generate a token for resetting the password
//     const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
//       expiresIn: "1h", // Token expires in 1 hour
//     });

//     // Send an email to the user with the reset password link
//     // In a real application, you would send an email with a link containing the token
//     // For demonstration purposes, we're just logging the reset link to the console
//     const resetLink = `http://yourwebsite.com/reset-password?token=${token}`;
//     console.log("Reset Password Link:", resetLink);

//     return res.send({
//       success: true,
//       message: "Password reset link sent to your email",
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: "Failed to send reset password email",
//     });
//   }
// });
// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if the user with the given email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.send({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // For demonstration purposes, we're just sending a success message without sending an email
//     return res.send({
//       success: true,
//       message: "Password reset link would have been sent to your email",
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: "Failed to send reset password email",
//     });
//   }
// });
  
// forgot password


router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }

    // Generate a token for resetting the password
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send an email to the user with the reset password link
    
    // const resetLink = `http://localhost:3000/reset-password/${token}`;
    const resetLink = `https://pvs-wallet-bank-application.vercel.app/reset-password/${token}`;


 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'pvswallet@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.send({
          success: false,
          message: "Failed to send reset password email",
        });
      } else {
        console.log("Email sent:", info.response);
        return res.send({
          success: true,
          message: "Password reset link sent to your email",
        });
      }
    });

  } catch (error) {
    console.error("Error:", error);
    res.send({
      success: false,
      message: "Failed to send reset password email",
    });
  }
});



// Reset password route
// router.post('/reset-password/:token', async (req, res) => {
//   const { token } = req.params; // Retrieve the token from params
//   const { newPassword } = req.body;

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.jwt_secret);
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update the password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();

//     res.json({ message: 'Password reset successfully for you' });
//   } catch (error) {
//     console.error('Error resetting password:', error.message);
//     res.status(500).json({ message: 'Failed to reset password' });
//   }
// });

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
 console.log({token});
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ 
      success:true,
      message: 'Password reset successfully for you' 
    });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Failed to reset password' });
  }
});






module.exports = router;
