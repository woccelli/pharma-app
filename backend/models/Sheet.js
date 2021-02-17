const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adviceSchema= require('./Advice');
const sectionSchema = require('./Section');

const SheetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    advices: [adviceSchema],
    sections: [sectionSchema],
    date: {
        type: Date,
        default: Date.now
    }
}); 

module.exports = Sheet = mongoose.model("sheets", SheetSchema);