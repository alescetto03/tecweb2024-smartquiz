import express from "express";
//import morgan from "morgan";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

import { homepageRouter } from "./routes/homepageRouter.js";
import { authenticationRouter } from "./routes/authenticationRouter.js";
import { quizRouter } from "./routes/quizRouter.js";
import { questionRouter } from "./routes/questionRouter.js";

import { enforceAuthentication } from "./middlewares/authorization.js";
import { exportFlashMessagesToViews } from "./middlewares/flash-messages.js";

const app = express();
const PORT = 3000;

// setting up view engine
app.set("view engine", "pug");

// parse incoming request into req.body object
app.use(express.urlencoded());
app.use(express.json());

// setting up middleware for session handling
//app.use(session({ secret: "sm4rTqU1z_", saveUninitialized: false, resave: false }));

// setting up middleware for cookies
app.use(cookieParser());

// third-party middleware for flash messages
//app.use(flash());

// custom middleware to make flash messages available to views
//app.use(exportFlashMessagesToViews);

// third-party middleware for method override
//TODO::Devo veramente utilizzarlo?
app.use(methodOverride('_method'));

//error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).json({
        code: err.status || 500,
        description: err.message || "An error occurred"
    });
});

//routes
app.use(authenticationRouter);
app.use(enforceAuthentication);
app.use(homepageRouter);
app.use(quizRouter);
app.use(questionRouter);
app.listen(PORT);