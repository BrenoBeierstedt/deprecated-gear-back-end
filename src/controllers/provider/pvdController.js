const express = require('express');

const Pvd = require('../../models/provider/provider');

const jwt = require('jsonwebtoken');

const router = express.Router();

const verifyToken = require('../../gearUtils/auth');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.use(verifyToken);


//create

router.post('/provider',verifyToken, async (req,res)=> {

    jwt.verify(req.token, 'secret',(err,authData)=> {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');

        } else {
            const add = new Pvd(req.body);

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

router.put('/provider/:id',verifyToken,async (req, res)=> {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Pvd.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true},
                (err, add) => {
                    if (err) return res.status(500).send(err);
                    const response = {
                        message: "Succefully updated ",
                        updatedtedCommon: add
                    };
                    console.log("Alter on C150PVD ID:", req.params.id, "by:", authData.username);
                    return res.status(200).send(response);
                });
        }

    });
});




//delete

router.delete('/provider/:id',verifyToken, async(req,res)=> {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Pvd.findByIdAndRemove(req.params.id, (err, add) => {


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
router.get('/provider/:id', verifyToken, async (req, res) => {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Pvd.findById(req.params.id, function (err, doc) {

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

router.get('/provider', verifyToken, (req, res) => {


    jwt.verify(req.token, 'secret', (err, authData) => {


        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Pvd.find({}, function (err, doc) {
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