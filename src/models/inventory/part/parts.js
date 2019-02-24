const mongoose = require('../../../dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const PrtSchema = new mongoose.Schema({
    PrtCod:{
        type:Number,

    },
    PrtDes:{
        type:String,

    },
    PrtPvd:{
        type:String,


    },
    PrtCon:{
        type:String,

    },
    PrtNum:{
        type:Number,

    },
    PrtPrc:{
        type:Number,

    },
    PrtAsg:{
        type:String,

    },
    PrtMsg:{
        type:String,

    },
    PrtPvc:{
        type:String,

    },



},{collection: 'C200PRT'});

PrtSchema.plugin(autoIncrement.plugin, 'PrtCod');
var PrtCod = mongoose.model('PrtCod', PrtSchema);

const Prt = mongoose.model('C200PRT', PrtSchema);

module.exports = Prt;