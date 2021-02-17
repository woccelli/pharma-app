const mongoose = require('mongoose');
const { Schema } = mongoose;

const adviceSchema = new Schema({
    icon: String,
    text: String
});

module.exports = adviceSchema;