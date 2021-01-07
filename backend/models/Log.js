const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LogSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'users'},
    _sheet: { type: Schema.Types.ObjectId, ref: 'sheets'},
    date: {
        type: Date,
        default: Date.now
    }

}); module.exports = Log = mongoose.model("logs", LogSchema);