const mongoose = require('mongoose')
const { Schema } = mongoose

const AddressSchema = new Schema({
    dest: { type: String },
    addr_1: { type: String },
    addr_2: { type: String },
    addr_comp: { type: String },
    postcode: { type: String },
    city: { type: String },
    country: { type: String }
})

module.exports = AddressSchema