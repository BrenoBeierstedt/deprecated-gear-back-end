const mongoose = require('../../infra/dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const PvdSchema = new mongoose.Schema({
    PvdCod:{
        type: String,



    },
    PvdNam:{
        type: String,

        required:true,

    },
    PvdTyp:{
        type: String,

    },
    PvdRed:{
        type : Date,
        default: Date.now,

    },
    PvdSec:{
       type:Number,
    },
    PvdEma:{
        type: String,

    },
    PvdCnm:{
        type: String,
    },
    AddZip:{
        type:Number,

    },
    AddCit:{
        type:String,

    },
    AddSta:{
        type:String,
    },
    AddStr:{
        type:String,
    },
    AddCom:{
        type: String,
    },

    TelAco:{
        type: Number,
         },
    TelNum:{
        type: Number,
    },


},{collection: 'C150PVD'});

PvdSchema.plugin(autoIncrement.plugin, 'PvdCod');
var PvdCod = mongoose.model('PvdCod', PvdSchema);

const Pvd = mongoose.model('c150pvd', PvdSchema);

module.exports = Pvd;
