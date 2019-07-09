const mongoose = require('../../../infra/dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const ProSchema = new mongoose.Schema({
    PvdCod:{
        type: String,



    },
    ProDes:{
        type: String,

        required:true,

    },
    ProPvd:{
        type: String,

    },
    ProRdt:{
        type : Date,
        default: Date.now,

    },
    ProDer:{
       type:String,
    },
    ProTyp:{
        type: String,

    },
    ProPrc:{
        type: Number,
    },
    ProMsg:{
        type:Number,

    },
    ProAsg:{
        type:Number,

    },

},{collection: 'C100PRO'});

ProSchema.plugin(autoIncrement.plugin, 'ProCod');
var ProCod = mongoose.model('ProCod', ProSchema);

const Pro = mongoose.model('c100pro', ProSchema);

module.exports = Pro;
