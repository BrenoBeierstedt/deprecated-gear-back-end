const express = require('express');

const Usr = require('../../models/login/user');

const router = express.Router();

const verifyToken = require('../../gearUtils/auth');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.use(verifyToken);

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/signup', async (req,res)=> {

    const usr = new Usr(req.body);
    console.log("usr",usr);
console.log("body",req.body);
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