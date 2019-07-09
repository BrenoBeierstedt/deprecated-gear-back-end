const mongoose = require('../../../infra/dataBase');
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);





const VhpSchema = new mongoose.Schema({
    "referencia":{
        type:String,

    },
    "fipe_codigo":{
        type:String,

    },
    "name":{
        type: String,



    },
    "combustivel":{
        type: Number,



    },
    "marca":{
        type: String,



    },
    "ano_modelo":{
        type: Number,



    },
    "preco":{
        type: Number,



    },
    "key":{
        type: String,



    },
    "time":{
        type: Number,



    },
    "veiculo":{
        type: String,



    },
    "id":{
        type: Number,



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
