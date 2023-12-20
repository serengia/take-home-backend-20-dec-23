const mongoose = require("mongoose");

const calculationsSchema = new mongoose.Schema(
  {
    num1: {
      type: Number,
    },
    operation: {
      type: String,
    },
    num2: {
      type: Number,
    },
    result: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Calculations = mongoose.model("Calculations", calculationsSchema);
module.exports = Calculations;
