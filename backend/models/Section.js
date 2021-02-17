const mongoose = require('mongoose');
const {Schema} = mongoose;

const sectionSchema = new Schema({
    title: String,
    text: String
});

module.exports = sectionSchema;