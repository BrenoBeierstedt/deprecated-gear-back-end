const mongoose = require('../../../dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const CvnSchema = new mongoose.Schema({
    CvnCod:{
        type:Number,

    },
    CusCod:{
        type:Number,

    },
    CusNam:{
        type:String,

    },
    MdlCod:{
        type:Number,

    },
    MdlNam:{
        type:String,

    },
    CvnFtp:{
        type:String,

    },
    CvnFby:{
        type:String,

    },
    CvnMdy:{
        type:String,

    },

    CvnCch:{
        type:String,

    },
    CvnPlt:{
        type:String,

    },
    CvnClr:{
        type:String,

    },
    CvnObs:{
        type:String,

    },
    CvnFdr:{
        type:String,

    },
    MnfNam:{
        type:String,

    },



},{collection: 'C400CVN'});

CvnSchema.plugin(autoIncrement.plugin, 'CvnCod');
var CvnCod = mongoose.model('CvnCod', CvnSchema);

const Cvn = mongoose.model('c400cvn', CvnSchema);

module.exports = Cvn;