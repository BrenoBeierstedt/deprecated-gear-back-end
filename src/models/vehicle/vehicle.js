const mongoose = require('../../dataBase');
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);





const MnfSchema = new mongoose.Schema({
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




MnfSchema.plugin(autoIncrement.plugin, 'MnfCod');
var MnfCod = mongoose.model('MnfCod', MnfSchema);
const Mnf = mongoose.model('c550mnf', MnfSchema);

module.exports = Mnf;