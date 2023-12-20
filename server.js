const dotenv = require("dotenv");

// -//////////////////////////
// LISTENING TO UNCAUGHT EXCEPTION before requiring our app
// UNCAUGHT EXCEPTION -> Coming from synchronous
process.on("uncaughtException", (err) => {
  console.log("ERROR - UNCAUGHT EXCEPTION 🧯🧯 =>", {
    error: err.name,
    message: err.message,
    err,
  });

  // Close the app gracefully
  // App will be automatically restarted -> Most hosting have tools to do this automatically
  process.exit(1);
});

// -//////////////////////////

dotenv.config({ path: "./.config.env" });

const app = require("./app");
const connectDB = require("./utils/connectDB");

// Connect to DB
connectDB(process.env.DB_LINK);

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} in ${process.env.NODE_ENV} mode!!!`
  );
});

// Handle any unhandled rejection instead of letting the app to crash
// UNHANDLED REJECTIONS -> Coming from promises (Asynchronous code)
process.on("unhandledRejection", (err) => {
  console.log("ERROR - UNHANSLED REJECTION 🧯🧯 =>", {
    error: err.name,
    message: err.message,
  });

  server.close(() => {
    // Close the app gracefully
    // App will be automatically restarted -> Most hosting have tools to do this automatically
    process.exit(1);
  });
});
