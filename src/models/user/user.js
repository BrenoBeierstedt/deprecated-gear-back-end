const mongoose = require('../../infra/dataBase')


const UserSchema = new mongoose.Schema({
    name:{
        type:String,

    },
    username:{
        type:String,
        require:true,
        unique:true,
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


const Usr = mongoose.model('C650USR', UserSchema)

module.exports = Usr
