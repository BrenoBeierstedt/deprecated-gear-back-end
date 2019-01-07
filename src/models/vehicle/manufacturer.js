const mongoose = require('../../dataBase');

const VhcMnfSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    fipe_name:{
        type: String,

        required:true,

    },
    order:{
        type: Number,

        required:true,

    },
    key:{
        type: String,

        required:true,

    },
    id:{
        type: Number,

        required:true,

    },

    createdAt:{
        type : Date,
        default: Date.now,
    },
},{collection: 'C550MNF'});

const VhcMnf = mongoose.model('c550mnf', VhcMnfSchema);

module.exports = VhcMnf;