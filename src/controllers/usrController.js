const express = require('express');

const Usr = require('../models/user');

const router = express.Router();



router.post('/signup', async (req,res)=> {

    const usr = new Usr(req.body);
console.log(req.body);
    usr
        .save()
        .then(result => {
            console.log(result);


        })
        .catch(err=>{
            console.log("Problem creating new document");
            return res.status(500).json(err);

        });
    res.status(201).json({
        message: "Succefully created",
        createdCommon: usr
    })
});

router.get('/register', async (req,res)=> {

        Usr.find({},function (err, doc) {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).send(err)
            }


        })
            .catch(err=>{
                return res.status(500).json({error:err});
            })
    }
);




module.exports = app => app.use('/auth', router);