const express = require('express');

const Pro = require('../models/product');

const router = express.Router();


router.post('/product', async (req,res)=> {
    try {
        const pro = Pro.create(req.body);

        return res.send( {pro} );
    }
    catch (err) {

        return res.status(400).send({error: 'Registration Failed'});

    }

});


module.exports = app => app.use('/auth', router);