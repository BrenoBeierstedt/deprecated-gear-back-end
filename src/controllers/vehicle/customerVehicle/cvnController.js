const express = require('express');

const Cvn = require('../../../models/vehicle/customer/customerVehicle');

const jwt = require('jsonwebtoken');

const router = express.Router();

const verifyToken = require('../../../gearUtils/auth');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.use(verifyToken);

//create

router.post('/costumervehicle',verifyToken, async (req,res)=> {

    jwt.verify(req.token, 'secret',(err,authData)=> {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');

        } else {
            const add = new Cvn(req.body);

            add
                .save()
                .then(result => {
                    console.log(result);


                })
                .catch(err => {
                    console.log("Problem creating new document");
                    return res.status(500);

                });
            res.status(201).json({
                message: "Succefully created",
                createdCommon: add
            })
        }
    });
});

//alter

router.put('/costumervehicle/:id',verifyToken,async (req, res)=> {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Cvn.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true},
                (err, add) => {
                    if (err) return res.status(500).send(err);
                    const response = {
                        message: "Succefully updated ",
                        updatedtedCommon: add
                    };
                    console.log("Alter on C400CVN ID:", req.params.id, "by:", authData.username);
                    return res.status(200).send(response);
                });
        }

    });
});




//delete

router.delete('/costumervehicle/:id',verifyToken, async(req,res)=> {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Cvn.findByIdAndRemove(req.params.id, (err, add) => {


                if (err) return res.status(500).send(err);
                const response = {
                    message: "Register succefully deleted",
                    id: add.id
                };
                console.log("Register ", add.id,"deleted by: ", authData.username);
                return res.status(200).send(response);

            });
        }

    });
});


//select by custuomer id


router.get('/cvn/:CusCod/search', verifyToken,function(req,res,next){
    var q = req.query.q;
var cusCod = req.params.CusCod;
console.log(cusCod)
    Cvn.find({
            CvnPlt:{
                $regex :new RegExp(q),
                $options:'i'
            },
        CusCod:cusCod
        },
        function (err,data) {
            console.log(err, data);
            res.json(data);
        });
});

router.get('/cvn/search', verifyToken,function(req,res,next){
    var q = req.query.q;


    Cvn.find({
            CvnPlt:{
                $regex :new RegExp(q),
                $options:'i'
            },
        },
        function (err,data) {
            console.log(err, data);
            res.json(data);
        });
});

//select all

router.get('/costumervehicle', verifyToken, (req, res) => {


    jwt.verify(req.token, 'secret', (err, authData) => {


        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Cvn.find({}, function (err, doc) {
                if (doc) {
                    res.status(200).send(doc);
                } else {
                    res.status(404).send(err)
                }


            })
                .catch(err => {
                    return res.status(500).json({error: err});
                })

        }

    });
});






module.exports = app => app.use('/auth', router);