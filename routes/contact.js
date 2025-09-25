const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send( "Contact us at email@example.com");
});

module.exports = router;
