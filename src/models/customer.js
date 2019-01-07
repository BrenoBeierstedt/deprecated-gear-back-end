const mongoose = require('./../dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const CusSchema = new mongoose.Schema({

    CusNam:{
        type: String,

        required:true,

    },
    CusBdy:{
        type: Date,

        required:true,

    },
    CusTyp:{
        type : String,
        required:true,

    },
    CusRed:{
        type : Date,
        default: Date.now,
    },
    CusSec:{
        type: Number,

    },
    CusEma:{
        type: String,
    },
    cusCpn:{
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
    AddNbh:{
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
    Cf1Aco:{
        type: Number,
    },
    Cf1Num:{
        type: Number,
    },
    Cf2Aco:{
        type: Number,

    },
    Cf2Num:{
         type: Number,

    },

},{collection: 'C050CUS'});

CusSchema.plugin(autoIncrement.plugin, 'CusCod');
var CusCod = mongoose.model('CusCod', CusSchema);

const Cus = mongoose.model('c050cus', CusSchema);

module.exports = Cus;