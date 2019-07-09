const mongoose = require('../../../infra/dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const SipSchema = new mongoose.Schema({
    SipCod:{
        type: Number,
    },

    SipCus:{
        type: String

    },
    SipVhc:{
        type: Number,

    },
    CvnPlt:{
        type: String,

    },
    MdlNam:{
        type: String,
    },
    SipOdm:{
        type: String

    },
    svcSts: {
        type: String,
    },
    SipStt: {
        type: String,
    },

    SipAtk:{
        type: String,
    },
    SipAcc:{
        type: Array,
    },
    SipIss:{
        type: Array,
    },
    SipObs:{
        type: Array,
    },
    SipDgn:{
        type: Array,
    },
    SipMch:{
        type: Number,
    },
    SipRqt:{
        type: Number,
    },
    CsvCod:{
        type: Number,
    },
    CvnID:{
        type: Number,
    },
    SipInd:{
        type: Date,
        default: Date.now,
    },
    SipDed:{
        type: Date,
    },
    parts: [{
        prtQty: {
            type: Number,

        },
        prtDes: {
            type: String,

        },
        prtPrc: {
            type: Number,
        },

    }],
    product: [{
        proQty: {
            type: Number,

        },
        proDescription: {
            type: String,

        },
        proPrc: {
            type: Number,
        },


    }],
    service: [{

        svcDescription: {
            type: String,

        },
        svcPrice: {
            type: Number,
        },

    }],



},{collection: 'C350SIP'});

SipSchema.plugin(autoIncrement.plugin, 'SipCod');
var SipCod = mongoose.model('SipCod', SipSchema);

const Sip = mongoose.model('C350SIP', SipSchema);

module.exports = Sip;
