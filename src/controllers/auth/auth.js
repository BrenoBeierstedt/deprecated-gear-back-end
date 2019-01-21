const express = require('express');


module.exports= {


    verifyToken:  function (req,res,next) {


            const bearerHeader = req.headers['authorization'];
            if (typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(' ');
                const token = bearer[1];
                req.token = token;

                next();
            } else {
                res.status(403).send('Auth required');
            }

        }

};



