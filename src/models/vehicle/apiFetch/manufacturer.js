const mongoose = require('../../../infra/dataBase');
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);





const MnfSchema = new mongoose.Schema({
    "name":{
        type:String,

    },
    "fipe_name":{
        type: String,



    },
    "order":{
        type: Number,



    },
    "key":{
        type: String,



    },
    "id":{
        type: Number,



    },

    "createdAt":{
        type : Date,
        default: Date.now,
    },
},{collection: 'C550MNF'});




MnfSchema.plugin(autoIncrement.plugin, 'MnfCod');
var MnfCod = mongoose.model('MnfCod', MnfSchema);
const Mnf = mongoose.model('c550mnf', MnfSchema);

module.exports = Mnf;
