const express = require('express');

const Add = require('../models/address');

const router = express.Router();



router.post('/address', async (req,res)=> {
    try {
        const add = Add.create(req.body);

        return res.send({ add });
    }
    catch (err) {

        return res.status(400).send({error: 'Registration Failed'});

    }

});

router.get('/address', async (req,res)=>{

    res.send(Add);


});


module.exports = app => app.use('/auth', router);