
const Vhc = require('../models/vehicle/apiFetch/manufacturer');
const findMax = require('./vhcFindMaxId');

const Request = require("request");









    findMax.findMax(function(err,doc){
    
       if(err){
           console.log(err)
       }
       console.log(doc)
    });













