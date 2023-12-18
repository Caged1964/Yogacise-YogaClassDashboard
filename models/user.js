const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    paymentStatus : { type: Boolean, default: false },
    currentBatch : { type: String, required: true },
    joinDate: { type: Date, default : Date.now},
    // batchHistory: [
    // {
    //   batch: { type: String, required: true },
    //   date: { type: Date, required: true },
    // }
    // ]
})

module.exports = mongoose.model('User', UserSchema);