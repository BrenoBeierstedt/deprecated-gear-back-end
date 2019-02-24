const mongoose = require('../../dataBase');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);



const UserSchema = new mongoose.Schema({
    name:{
        type:String,

    },
    username:{
        type:String,
        require:true,
    },
    email:{
       type: String,
        unique:false,

        lowercase:true,
    },
    password:{
        type:String,

        select:false,
    },
    createdAt:{
        type : Date,
        default: Date.now,
    },
}, {collection: 'C650USR'});

UserSchema.plugin(autoIncrement.plugin, 'UsrCod');
var UsrCod = mongoose.model('UsrCod', UserSchema);

const Usr = mongoose.model('C650USR', UserSchema);

module.exports = Usr;