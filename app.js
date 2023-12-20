const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppErrorHandler = require("./utils/AppErrorHandler");
const errorController = require("./controllers/errorController");

const calculationsRouter = require("./routes/calculationRouter");

const app = express();

// GLOBAL MIDDLEWARE
// Configure cors

app.use(
  cors({
    origin: ["http://localhost:3000", "https://sere-calc.vercel.app"],
    credentials: true,
    // allowedHeaders: "Content-Type,Authorization,x-csrf-token",
    // exposedHeaders: ["*", "Authorization"],
  })
);
app.options("*", cors());

// Security middleware
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 500,
  // Resets after 1 hour
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. Please try again after one hour",
});

app.use("/api", limiter);

// Body parser, reading data from request to req.body
app.use(express.json({ limit: "15kb" }));

//  Cookie parser, reading data from cookie
app.use(cookieParser());

// Data sanitization against NoSQL injections
// e.g. ==> {"email": {$gt: ""}, "password": "testPass"}
app.use(mongoSanitize());

// Sanitization against XSS -> Stop user from injecting some html that might have
// malicious js scripts to db that can then target others using our app
app.use(xss());

// Routes configurations
app.use("/api", calculationsRouter);

// All uncaught routes
app.all("*", (req, res, next) => {
  next(
    new AppErrorHandler(`Could not find the resource ${req.originalUrl}`, 404)
  );
});

// GLOBAL ERROR MIDDLEWARE
app.use(errorController);

module.exports = app;
