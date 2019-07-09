const mongoose = require('../../../infra/dataBase');
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);





const VhpSchema = new mongoose.Schema({
    "fipe_marca":{
        type:String,

    },
    "fipe_codigo":{
        type:String,

    },
    "name":{
        type: String,



    },
    "marca":{
        type: Number,



    },
    "key":{
        type: String,



    },
    "id":{
        type: String,



    },

    "createdAt":{
        type : Date,
        default: Date.now,
    },
},{collection: 'C550VHP'});




VhpSchema.plugin(autoIncrement.plugin, 'MnfCod');
var VhpCod = mongoose.model('MnfCod', VhpSchema);
const Vhp = mongoose.model('c552vhp', VhpSchema);

module.exports = Vhp;
