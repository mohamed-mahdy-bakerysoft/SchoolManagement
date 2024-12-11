const express = require('express');
const { createLibraryRecord } = require('../controllers/libraryController');
const router = express.Router();

router.post('/', createLibraryRecord);

module.exports = router;
