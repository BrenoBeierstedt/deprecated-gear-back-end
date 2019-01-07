const express = require('express');

const Prt = require('../models/parts');

const router = express.Router();



router.post('/parts', async (req,res)=> {
    try {
        const prt = Prt.create(req.body);

        return res.send({ prt });
    }
    catch (err) {

        return res.status(400).send({error: 'Registration Failed'});

    }

});




module.exports = app => app.use('/auth', router);