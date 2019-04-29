
const express = require('express');
const app = express();

const Csv = require('../../../models/service/commonService/commonService');


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

router.post('/csv',verifyToken, async (req,res)=> {

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

router.put('/csv/:id',verifyToken,async (req, res)=> {

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

router.delete('/csv/:id',verifyToken, async(req,res)=> {
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


router.get('/csv/search', verifyToken,function(req,res,next){
    var q = req.query.q;

    Csv.find({
            CsvDes:{
                $regex :new RegExp(q),
                $options:'i'
            }
        },
        function (err,data) {
            console.log(err, data);
            res.json(data);
        });
});


//select all

    router.get('/csv', verifyToken, (req, res) => {


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