const express = require('express');







module.exports = function(req, res, next) {


    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        res.status(403).send('Auth required');
    }
    if (typeof bearerHeader !== 'undefined') {

        const bearer = bearerHeader.split(':');

        const split = bearer[1];
        const regex = split.replace(/}/gi, "");
        const token = regex.replace(/"/gi, "");

        req.token = token;

        next();
    }

};

