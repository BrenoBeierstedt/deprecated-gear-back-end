const express = require('express');

const Emp = require('../models/emp');

const router = express.Router();



router.post('/employee', async (req,res)=> {
    try {
        const emp = Emp.create(req.body);

        return res.send({ emp });
    }
    catch (err) {

        return res.status(400).send({error: 'Registration Failed'});

    }

});





module.exports = app => app.use('/auth', router);