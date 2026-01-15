const Right = require('../models/rights');

// @desc   Get all rights
exports.getAllRights = async (req, res) => {
  try {
    const rights = await Right.find();
    res.json(rights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Add a new right
exports.createRight = async (req, res) => {
  const { title, category, description } = req.body;

  const right = new Right({ title, category, description });

  try {
    const newRight = await right.save();
    res.status(201).json(newRight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
