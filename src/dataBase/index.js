const mongoose = require('mongoose');

let dbCon  = require ('./../gearUtils/addTable');

mongoose.set('useFindAndModify', false);


const db =mongoose.connect('mongodb://'+dbCon.Add.ip, { useNewUrlParser: true } );

mongoose.promise = global.Promise;
mongoose.set('useCreateIndex', true);



module.exports = mongoose;