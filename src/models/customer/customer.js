const mongoose = require('../../infra/dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const CusSchema = new mongoose.Schema({

    CusCod:{
        type: Number,
autoIncrement: true,
        unique: true,
        startAt: 2000,

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



CusSchema.plugin(autoIncrement.plugin, 'CusCod');
var CusCod = mongoose.model('CusCod', CusSchema);

CusSchema.plugin(autoIncrement.plugin, { model: 'Customer', field: 'CusCod' });


const Cus = mongoose.model('c050cus', CusSchema);

module.exports = Cus;
