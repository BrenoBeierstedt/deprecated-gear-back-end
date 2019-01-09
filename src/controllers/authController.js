const express = require('express');

const User = require('../models/user');

const router = express.Router();

const Jwt = require('jsonwebtoken');

router.post('/login/:username/:password', async (req,res)=> {

    const username = req.params.username;
    const password = req.params.password;


   var query= User.findOne({username, password});

     query.select({username, password});


    query.exec(function (err, doc) {
        if (err) return handleError(err);

        if(!doc){
            res.status(404).send('usuário não encontrado');
        }else {

            if ((doc.username === username) && (doc.password === password)) {
               Jwt.sign({username, password}, 'secret',(err,token)=>{
                   res.json({
                       token
                   })
               })
            }

        }


    })
     
    });









module.exports = app => app.use('/auth', router);