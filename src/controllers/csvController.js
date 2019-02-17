
const express = require('express');
const app = express();

const Csv = require('../models/commonService');


const jwt = require('jsonwebtoken');

const router = express.Router();

const verifyToken = require('./auth/auth');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.use(verifyToken);


//create

router.post('/common',verifyToken, async (req,res)=> {

    jwt.verify(req.token, 'secret',(err,authData)=> {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');

        } else {
            const csv = new Csv(req.body);

            csv
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
                createdCommon: csv
            })
        }
    });
});

//alter

router.put('/common/:id',verifyToken,async (req, res)=> {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Csv.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true},
                (err, csv) => {
                    if (err) return res.status(500).send(err);
                    const response = {
                        message: "Succefully updated ",
                        updatedtedCommon: csv
                    };
                    console.log("Alter on C300CSV ID:", req.params.id, "by:", authData.username);
                    return res.status(200).send(response);
                });
        }

    });
});




//delete

router.delete('/common/:id',verifyToken, async(req,res)=> {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Csv.findByIdAndRemove(req.params.id, (err, csv) => {


                if (err) return res.status(500).send(err);
                const response = {
                    message: "Register succefully deleted",
                    id: csv.id
                };
                console.log("Register ", csv.id,"deleted by: ", authData.username);
                return res.status(200).send(response);

            });
        }

    });
});


//select by id
    router.get('/common/:id', verifyToken, async (req, res) => {

        jwt.verify(req.token, 'secret', (err, authData) => {
            if (err) {
                res.status(403).json('Authorization not found');
                console.log('Authorization not found');
            } else {

                Csv.findById(req.params.id, function (err, doc) {

                    if (doc) {
                        res.status(200).json(doc);
                    } else {
                        res.status(404).json({
                            message: 'ID not valid'
                        })
                    }


                })
                    .catch(err => {
                        return res.status(500).json({error: err});
                    })
            }

        });

    });


//select all

    router.get('/common', verifyToken, (req, res) => {


        jwt.verify(req.token, 'secret', (err, authData) => {


            if (err) {
                res.status(403).json('Authorization not found');
                console.log('Authorization not found');
            } else {

                Csv.find({}, function (err, doc) {
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