const express = require('express');
const app = express();
const cors = require('cors');



// const dbConfig = require('./config/dbConfig.js');
const connectDB = require('./config/dbConfig.js');
const usersRoute = require('./routes/userRoute.js');
const transactionsRoute = require('./routes/transactionsRoutes.js');
const requestsRoute = require('./routes/requestsRoute.js');
const adminsRoute = require('./routes/adminRoute.js');
const profileRoute = require('./routes/profileRoute.js');

require('dotenv').config();
app.use(express.json());


app.use(cors());
connectDB();

// entry point for user route
app.use('/api/users', usersRoute);

app.use('/api/profile', profileRoute);

app.use('/api/admins', adminsRoute);

//entry point for transaction route
app.use('/api/transactions', transactionsRoute);

// call the end points in routes folder here 
app.use('/api/requests', requestsRoute);

const PORT = 5000;
// const PORT = process.env.PORT || 5000;
// const path = require("path");
// _dirname = path.resolve();

// heroku deployment
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static("client/build"));
//     app.get("*",(req, res)=>{
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
});

