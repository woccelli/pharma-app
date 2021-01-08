const mongoose = require("mongoose");
const AddressSchema = require("./Address");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addresses: 
        [AddressSchema],
        default: []
    ,
    role: {
        type: String,
        default: "BASIC"
    },
    subuntil: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    },

}); module.exports = User = mongoose.model("users", UserSchema);