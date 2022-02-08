// Server
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
// DB
const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;
require('./models/User');
require('./models/Sheet')
require('./models/Log')
// Authentication and authorization
const passport = require("passport");
// route handlers
const users = require("./routes/api/users");
const sheets = require("./routes/api/sheets");
//Config
require('dotenv').config();


//App setup
const app = express();
app.use(cors());
app.use(express.json());

// DB Config - Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

//Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/sheets", sheets)

if(process.env.NODE_ENV === 'production') {
    // Express will surve up production assets
    const buildPath = path.join(__dirname, '..', 'frontend', 'build')
    app.use(express.static(buildPath));
    // Express will serve up the index html file
    // if it doesn't recognise the file
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
    });
}

//Port configuration
const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});