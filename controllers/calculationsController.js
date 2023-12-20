const Calculations = require("../models/Calculation");

exports.getAllCalculations = async (req, res, next) => {
  try {
    const data = await Calculations.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.postCalculation = async (req, res, next) => {
  try {
    await Calculations.create(req.body);

    res.status(200).json({
      status: "success",
      message: "Posted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCalculation = async (req, res, next) => {
  try {
    await Calculations.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Resource deleted",
    });
  } catch (error) {
    next(error);
  }
};
