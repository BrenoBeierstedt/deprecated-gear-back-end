const mongoose = require('../../dataBase');
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);





const VhcSchema = new mongoose.Schema({
    "name":{
        type:String,

    },
    "fipe_name":{
        type: String,



    },
    "marca":{
        type: String,



    },
    "key":{
        type: String,



    },
    "id":{
        type: Number,



    },
    fipe_marca:{
        type: String,



    },

    "createdAt":{
        type : Date,
        default: Date.now,
    },
},{collection: 'C551VHC'});




VhcSchema.plugin(autoIncrement.plugin, 'VhcCod');
var MnfCod = mongoose.model('VhcCod', VhcSchema);
const Vhc = mongoose.model('c551vhc', VhcSchema);

module.exports = Vhc;