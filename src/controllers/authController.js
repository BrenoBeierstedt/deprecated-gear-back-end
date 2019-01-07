const express = require('express');

const User = require('../models/user');

const router = express.Router();


router.post('/login', async (req,res)=> {

    req.params.user


});




module.exports = app => app.use('/auth', router);