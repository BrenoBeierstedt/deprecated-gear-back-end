const mongoose = require('../../dataBase');
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const MncSchema = new mongoose.Schema({
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
},{collection: 'C551MNC'});

MncSchema.plugin(autoIncrement.plugin, 'MncCod');
var MncCod = mongoose.model('MncCod', MncSchema);
const Mnc = mongoose.model('c551mnc', MncSchema);

module.exports = Mnc;