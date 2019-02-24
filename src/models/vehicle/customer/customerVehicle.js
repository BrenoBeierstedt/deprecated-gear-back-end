const mongoose = require('../../../dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const CvnSchema = new mongoose.Schema({
    CvnCod:{
        type:Number,

    },
    MdlCod:{
        type:Number,

    },

    CvnCch:{
        type:Number,

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



},{collection: 'C400CVN'});

CvnSchema.plugin(autoIncrement.plugin, 'CvnCod');
var CvnCod = mongoose.model('CvnCod', CvnSchema);

const Cvn = mongoose.model('c400cvn', CvnSchema);

module.exports = Cvn;