const express = require('express');

const Cus = require('../models/customer');

const jwt = require('jsonwebtoken');

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





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
                    console.log("Alter on C400CVN ID:", req.params.id, "by:", authData.username);
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


//select by id
router.get('/customer/:id', verifyToken, async (req, res) => {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Cus.findById(req.params.id, function (err, doc) {

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
/*
router.get('/customer', verifyToken, (req, res) => {


    jwt.verify(req.token, 'secret', (err, authData) => {


        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            CUs.find({}, function (err, doc) {
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
*/

router.get('/customer',  (req, res) => {





var query = Cus.find();

query.select('CusNam Cf1Num CusCod CusEma -_id');

query.exec(function (err, doc) {
    if (err) return handleError(err);
    if(!doc){
        res.status(404).send(err);
    }else {

                    res.status(200).send(doc);
                }


            })




});


function verifyToken(req, res, next) {


    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        res.status(403).send('Auth required');
    }
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;

        next();
    }

}



module.exports = app => app.use('/auth', router);