const mongoose = require('../../../dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

const SipSchema = new mongoose.Schema({
    SipCod:{
        type: Number,
    },

    SipCus:{
        type: Number

    },
    SipVhc:{
        type: Number,

    },
    SipOdm:{
        type: Number

    },

    SipAtk:{
        type: Number,
    },
    SipAcc:{
        type: String,
    },
    SipIss:{
        type: String,
    },
    SipObs:{
        type: String,
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
        svcSts: {
            type: Number,
        },

    }],



},{collection: 'C350SIP'});

SipSchema.plugin(autoIncrement.plugin, 'SipCod');
var SipCod = mongoose.model('SipCod', SipSchema);

const Sip = mongoose.model('c350sip', SipSchema);

module.exports = Sip;