const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
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
    addresses: {
        type: [
            {
                dest: { type: String },
                addr_1: { type: String },
                addr_2: { type: String },
                addr_comp: { type: String },
                postcode: { type: String },
                city: { type: String },
                country: { type: String }
            }
        ],
        default: []
    },
    role: {
        type: String,
        default: "BASIC"
    },
    subscriber: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },

}); module.exports = User = mongoose.model("users", UserSchema);