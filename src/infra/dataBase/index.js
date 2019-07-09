const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const url = process.env.MONGO_URL+process.env.MONGO_DB

const db =mongoose.connect(url, { useNewUrlParser: true } );

mongoose.promise = global.Promise;
mongoose.set('useCreateIndex', true);

mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`))

module.exports = mongoose;
