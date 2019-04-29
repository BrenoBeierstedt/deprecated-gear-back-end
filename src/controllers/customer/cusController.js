const express = require('express');

const Cus = require('../../models/customer/customer');

const jwt = require('jsonwebtoken');

const router = express();

const verifyToken = require('../../gearUtils/auth');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.use(verifyToken);


//create

router.post('/customer',verifyToken, async (req,res)=> {

    jwt.verify(req.token, 'secret',(err,authData)=> {
        if (err) {
          res.status(403).json('Authorization not found');
            console.log('Authorization not found');

       } else {

           // const body = JSON.parse(req.body);
            Cus.create(req.body, function (err, doc) {
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

router.put('/customer/:id',verifyToken,async (req, res)=> {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Cus.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true},
                (err, add) => {
                    if (err) return res.status(500).send(err);
                    const response = {
                        message: "Succefully updated ",
                        updatedtedCommon: add
                    };
                    console.log("Alter on C400CVN ID:", req.params.id, req.params.CusNam, "by:", authData.username);
                    return res.status(200).send(response);
                });
        }

    });
});




//delete

router.delete('/customer/:id',verifyToken, async(req,res)=> {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Cus.findByIdAndRemove(req.params.id, (err, add) => {


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

router.get('/customer', verifyToken, (req, res) => {


    jwt.verify(req.token, 'secret', (err, authData) => {


        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Cus.find({}, function (err, doc) {
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



router.get('/customer/search', verifyToken,function(req,res,next){
    var q = req.query.q;

    Cus.find({
            CusNam:{
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