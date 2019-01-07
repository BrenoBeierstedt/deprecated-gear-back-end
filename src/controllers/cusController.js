const express = require('express');

const Cus = require('../models/customer');

const router = express.Router();


router.post('/customer', async (req,res)=> {
    try {
        const cus = Cus.create(req.body);

        return res.send({ cus });
    }
    catch (err) {

        return res.status(400).send({error: 'Registration Failed'});

    }

});


module.exports = app => app.use('/auth', router);