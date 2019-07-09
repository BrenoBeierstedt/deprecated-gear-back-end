const mongoose = require('../../infra/dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

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

AddSchema.plugin(autoIncrement.plugin, 'AddCod');
var AddCod = mongoose.model('AddCod', AddSchema);

const Add = mongoose.model('c500add', AddSchema);

module.exports = Add;
