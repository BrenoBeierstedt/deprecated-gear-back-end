const express = require('express');

const Emp = require('../../models/employee/emp');



const verifyToken = require('../../gearUtils/auth');




const jwt = require('jsonwebtoken');

const router = express.Router();


//create

router.use(verifyToken);
router.post('/employee',verifyToken, async (req,res)=> {

    jwt.verify(req.token, 'secret',(err,authData)=> {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');

        } else {
            Emp.create(req.body, function (err, doc) {
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

router.put('/employee/:id',verifyToken,async (req, res)=> {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Emp.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true},
                (err, add) => {
                    if (err) return res.status(500).send(err);
                    const response = {
                        message: "Succefully updated ",
                        updatedtedCommon: add
                    };
                    console.log("Alter on C000EMP ID:", req.params.id, "by:", authData.username);
                    return res.status(200).send(response);
                });
        }

    });
});




//delete

router.delete('/employee/:id',verifyToken, async(req,res)=> {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Emp.findByIdAndRemove(req.params.id, (err, add) => {


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


router.get('/emp/search', verifyToken,function(req,res,next){
    var q = req.query.q;

    Emp.find({
            EmpNam:{
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

router.get('/employee', verifyToken, (req, res) => {


    jwt.verify(req.token, 'secret', (err, authData) => {


        if (err) {
            res.status(403).json('Authorization not found');
            console.log('Authorization not found');
        } else {

            Emp.find({}, function (err, doc) {
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