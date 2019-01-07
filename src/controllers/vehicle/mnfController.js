const express = require('express');

const Mdl = require('../../models/vehicle/manufacturer');

const router = express.Router();



router.post('/model', async (req,res)=> {
    try {
        const mdl = Mdl.create(req.body);

        return res.send({ mdl });
    }
    catch (err) {

        return res.status(400).send({error: 'Registration Failed'});

    }

});


module.exports = app => app.use('/auth', router);