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




router.get('/tata', verifyToken,function(req,res,next){
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