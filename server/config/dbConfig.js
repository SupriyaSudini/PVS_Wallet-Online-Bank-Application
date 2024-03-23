// require('dotenv').config();

// const mongoose = require('mongoose');

// // mongoose.connect('mongodb+srv://SupriyaSudini:sweety169@mernstack.jp9dzds.mongodb.net/Wallet_PVS');

// mongoose.connect(process.env.MONGODB_URI,);

// const connectionResult = mongoose.connection;

// connectionResult.on('error', () => {
//    console.log(console, 'Connection error:');
// });
// connectionResult.on('connected', () => {
//     console.log('MongoDB Connected successfully');
// });

// module.exports = connectionResult;


require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove the deprecated options
    });
    console.log('MongoDB Connected successfully');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

