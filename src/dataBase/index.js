const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/ApiTest', { useNewUrlParser: true } );
mongoose.promise = global.Promise;
mongoose.set('useCreateIndex', true);



module.exports = mongoose;