const express = require('express');


const Vhp = require('../../../models/vehicle/apiFetch/vehicle');

const jwt = require('jsonwebtoken');

const router = express();

const verifyToken = require('../../../gearUtils/auth');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.use(verifyToken);


//create

router.post('/vhp',verifyToken, async (req,res)=> {

    jwt.verify(req.token, 'secret',(err,authData)=> {
        if (err) {
          res.status(403).json('Authorization not found');
            console.log('Authorization not found');

       } else {

           // const body = JSON.parse(req.body);
            Vhp.create(req.body, function (err, doc) {
                if(err){
                    console.log("Problem creating new document", err);
                    return res.status(500);

                }

                res.status(201).json({
                    message: "Succefully created",
                    createdCommon: doc
                });

           });


        }
    });
});

//alter

router.put('/vhp/:id',verifyToken,async (req, res)=> {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Vhp.findByIdAndUpdate(
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

router.delete('/vhp/:id',verifyToken, async(req,res)=> {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Vhp.findByIdAndRemove(req.params.id, (err, add) => {


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






//select all

router.get('/vhp', verifyToken, (req, res) => {


    jwt.verify(req.token, 'secret', (err, authData) => {


        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Vhp.find({}, function (err, doc) {
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

router.get('/vhp/:name/search', verifyToken,function(req,res,next){
    var q = req.query.q;
    var name = req.params.name;
    Vhp.find({
            name:{
                $regex :new RegExp(q),
                $options:'i'
            },
            marca:name
        },
        function (err,data) {
            console.log(err, data);
            res.json(data);
        });
});

router.get('/vhp/search', verifyToken,function(req,res,next){
    var q = req.query.q;

    Vhp.find({
            name:{
                $regex :new RegExp(q),
                $options:'i'
            }
        },
        function (err,data) {
            console.log(err, data);
            res.json(data);
        });
});






module.exports = app => app.use('/auth', router);