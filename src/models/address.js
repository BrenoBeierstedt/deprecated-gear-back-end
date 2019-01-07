const mongoose = require('../dataBase');

const AddSchema = new mongoose.Schema({
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

    }

},{collection: 'C500ADD'});

const Add = mongoose.model('c500add', AddSchema);

module.exports = Add;