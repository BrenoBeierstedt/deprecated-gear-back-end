const mongoose = require('../../dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const EmpSchema = new mongoose.Schema({

    EmpNam:{
        type: String,



    },
    EmpBdy:{
        type: Date,



    },
    EmpInd:{
        type : Date,
        default: Date.now,

    },
    EmpSec:{
        type: Number,



    },

    EmpPos:{
        type: String,



    },
    EmpEma:{
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

},{collection: 'C000EMP'});

EmpSchema.plugin(autoIncrement.plugin, 'EmpCod');
var EmpCod = mongoose.model('EmpCod', EmpSchema);

const Emp = mongoose.model('c000emp', EmpSchema);

module.exports = Emp;