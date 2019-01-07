const mongoose = require('../dataBase');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
       type: String,
       unique:true,

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

const User = mongoose.model('User', UserSchema);

module.exports = User;