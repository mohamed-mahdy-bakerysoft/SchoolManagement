const express = require('express');
const { createFeesRecord } = require('../controllers/feesController');
const router = express.Router();

router.post('/', createFeesRecord);

module.exports = router;
