const express = require('express');

const Pvd = require('../models/provider');

const router = express.Router();


router.post('/provider', async (req,res)=> {
    try {
        const pvd = Pvd.create(req.body);

        return res.send( {pvd} );
    }
    catch (err) {

        return res.status(400).send({error: 'Registration Failed'});

    }

});


module.exports = app => app.use('/auth', router);