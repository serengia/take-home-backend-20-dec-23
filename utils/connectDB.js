const mongoose = require("mongoose");

module.exports = async (DB_LINK) => {
  try {
    await mongoose.connect(DB_LINK);
    console.log("Successfully connected to DB!!!");
  } catch (error) {
    console.log("----FAILED TO CONNECT TO DATABASE-----");
    console.log("DB ERROR 🧯🧯 ==>", error);
  }
};
