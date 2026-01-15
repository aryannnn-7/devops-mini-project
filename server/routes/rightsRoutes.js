const express = require('express');
const router = express.Router();
const rightsController = require('../controllers/rightsController');

// Routes
router.get('/', rightsController.getAllRights);
router.post('/', rightsController.createRight);

module.exports = router;
