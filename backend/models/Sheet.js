const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const SheetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shortdescription: {
        type: String,
        required: true
    },
    synonyms: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        default:""
    },
    date: {
        type: Date,
        default: Date.now
    }
    

}); module.exports = Sheet = mongoose.model("sheets", SheetSchema);