// Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require("passport");
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const moment = require('moment');
require('dotenv').config();

// import routes
const recordsalesRoutes = require("./routes/recordsalesRoutes");
const authRoutes = require('./routes/authRoutes');
const recordstockRoutes = require('./routes/recordstockRoutes');
const managerRoutes = require('./routes/managerRoutes');
const invetoryRoutes = require('./routes/inventoryRoutes');
const indexRoutes = require("./routes/indexRoutes");
const attendantRoutes = require('./routes/attendantRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const port = 3001;

// Configurations
app.locals.moment = moment;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection
  .on('open', () => console.log('Mongoose connection open'))
  .on('error', (err) => console.log(`Connection error: ${err.message}`));

// View engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(expressSession({
  secret: process.env.SESSION_SECRET,  
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // one day
}));

// Passport config
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/",indexRoutes);
app.use("/",authRoutes);
app.use("/",recordsalesRoutes);
app.use("/",recordstockRoutes);
app.use("/",managerRoutes);
app.use("/",invetoryRoutes);
app.use("/",attendantRoutes);
app.use("/",adminRoutes);




app.listen(port, () => console.log(`Listening on port ${port}`));
