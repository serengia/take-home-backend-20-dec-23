module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    // DEVELOPMENT ERROR - HANDLER
    // console.log("TESTING 🧯🧯🧯", err.name);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      err,
    });
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    // PRODUCTION ERROR HANDLER
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  next();
};
