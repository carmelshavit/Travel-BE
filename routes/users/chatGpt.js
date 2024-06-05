const express = require('express');
const router = express.Router();
const handleServerError = require("../../libs/utility/ErrorHandlers.js");

router.get('/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode;
    try {
        
        
    } catch (err) {
        handleServerError(err, res);
    }
})

module.exports = router;