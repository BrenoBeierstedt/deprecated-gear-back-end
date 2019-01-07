const express = require('express');

const Sip = require('../models/serviceInProgress');

const router = express.Router();


router.post('/service', async (req,res)=> {
    try {
        const sip = Sip.create(req.body);

        return res.send( {sip} );
    }
    catch (err) {

        return res.status(400).send({error: 'Registration Failed'});

    }

});


module.exports = app => app.use('/auth', router);