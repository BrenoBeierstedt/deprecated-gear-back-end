const express = require('express');

const Cvn = require('../models/customerVehicle');

const router = express.Router();


router.post('/vehicle', async (req,res)=> {
    try {
        const cvn = Cvn.create(req.body);

        return res.send( {cvn} );
    }
    catch (err) {

        return res.status(400).send({error: 'Registration Failed'});

    }

});


module.exports = app => app.use('/auth', router);