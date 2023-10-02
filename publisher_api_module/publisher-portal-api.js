
const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.get("/publisher-api", (req, res)=>{
    res.send("publisher-portal-up");
})

module.exports = router;