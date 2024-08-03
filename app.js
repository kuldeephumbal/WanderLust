const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/expressError.js");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");
const User = require("./models/user.js");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

const db = process.env.ATLASDB_URL;
// const mongoDB = "mongodb://127.0.0.1:27017/wanderLust";


main()
.then(() => {
  console.log("connection successful");
})
.catch((err) => console.log(err));

async function main() {
await mongoose.connect(db);
}

const store = MongoStore.create({
    mongoUrl: db,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

// store.on("error", function (e) {
//     console.log("Session Store Error", e);
// });


// Session & Cookie Configuration
const sessionConfig = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

// Session and Flash Middleware
app.use(session(sessionConfig));    
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Local Varialbe Middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success"); 
    res.locals.error = req.flash("error");
    res.locals.warning = req.flash("warning");
    res.locals.currentUser = req.user;
    next();
});

//Home Route
app.get("/home", (req, res) => {
    res.render("listings/home.ejs");
});

//Routes
app.use("/", listingRoutes);
app.use("/", reviewRoutes);
app.use("/", userRoutes);

//All Error Handler
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

//Error Handler 
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { message });
});

app.listen(port,() => {
   console.log(`listening on port ${port}`);
});