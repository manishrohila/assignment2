const express = require('express');

const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {scrapeAndSave} = require('../controllers/productController');

router.route('/scrapeAndSave',).post(protect,scrapeAndSave);
module.exports = router;