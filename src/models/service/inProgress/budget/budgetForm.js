const mongoose = require('../../dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const BdgSchema = new mongoose.Schema({

    CusCod:{
        type: String,
        autoIncrement: true,


    },
    CusNam:{
        type: String,

        required:true,

    },
    CusSec:{
        type: Number,

    },
    CusBdy:{
        type: Date,



    },
    CusTyp:{
        type : String,


    },
    CusRed:{
        type : Date,
        default: Date.now,
    },

    CusEma:{
        type: String,
    },
    cusCpn:{
        type: String,
    },

    CusAdd: [{
        AddZip: {
            type: Number,

        },
        AddCit: {
            type: String,

        },
        AddSta: {
            type: String,
        },
        AddNbh: {
            type: String,
        },
        AddStr: {
            type: String,
        },
        AddCom: {
            type: String,
        },
    }],

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

BdgSchema.plugin(autoIncrement.plugin, 'BdgCod');
var CusCod = mongoose.model('BdgCod', BdgSchema);

const Cus = mongoose.model('c050cus', BdgSchema);

module.exports = Bdg;