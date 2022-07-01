const mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
   
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zipcode:{
        type: String,
        required: true
    }

}, {
    timestamps: true
})


module.exports = mongoose.model("Address", addressSchema)