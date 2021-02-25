const mongoose = require('mongoose');
const { Schema } = mongoose;

const adviceSchema = new Schema({
    icon: String,
    title: String,
    text: String
});

module.exports = adviceSchema;