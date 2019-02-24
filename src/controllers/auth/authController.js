const express = require('express');

const User = require('../../models/login/user');

const router = express();

const Jwt = require('jsonwebtoken');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/login', async (req,res)=> {

    const username = req.body.login;
    const password = req.body.password;


   var query= User.findOne({username, password});

     query.select({username, password});


    query.exec(function (err, doc) {
        if (err) return handleError(err);

        if(!doc){
            res.status(404).send('usuário não encontrado');
        }else {

            if ((doc.username === username) && (doc.password === password)) {
               Jwt.sign({username, password}, 'secret',{ expiresIn: '7d'},(err,token)=>{
                   res.json({
                       token
                   })
               })
            }

        }


    })
     
    });









module.exports = app => app.use('/auth', router);