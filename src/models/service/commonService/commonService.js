const mongoose = require('../../../dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const CsvSchema = new mongoose.Schema({
    CsvCod:{
        type: Number,
    },

    CsvPrc:{
        type: Number

    },
    CsvDes:{
        type: String,

        required:true,

    },
    CsvPrc:{
        type: Number

    },

    CsvObs:{
        type: String,
    },
    CsvEst:{
        type: Number,
    },
    createdAt:{
        type : Date,
        default: Date.now,
    },


},{collection: 'C300CSV'});

CsvSchema.plugin(autoIncrement.plugin, 'CsvCod');
var CsvCod = mongoose.model('CsvCod', CsvSchema);

const Csv = mongoose.model('C300CSV', CsvSchema);

module.exports = Csv;