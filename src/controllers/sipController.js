const express = require('express');

const Sip = require('../models/serviceInProgress');

const jwt = require('jsonwebtoken');

const router = express.Router();


//create

router.post('/sip',verifyToken, async (req,res)=> {

    jwt.verify(req.token, 'secret',(err,authData)=> {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');

        } else {
            const add = new Sip(req.body);

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

router.put('/sip/:id',verifyToken,async (req, res)=> {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Sip.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true},
                (err, add) => {
                    if (err) return res.status(500).send(err);
                    const response = {
                        message: "Succefully updated ",
                        updatedtedCommon: add
                    };
                    console.log("Alter on C350SIP ID:", req.params.id, "by:", authData.username);
                    return res.status(200).send(response);
                });
        }

    });
});




//delete

router.delete('/sip/:id',verifyToken, async(req,res)=> {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Sip.findByIdAndRemove(req.params.id, (err, add) => {


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
router.get('/sip/:id', verifyToken, async (req, res) => {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Sip.findById(req.params.id, function (err, doc) {

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

router.get('/sip', verifyToken, (req, res) => {


    jwt.verify(req.token, 'secret', (err, authData) => {


        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Sip.find({}, function (err, doc) {
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