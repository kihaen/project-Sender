const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email : {type : String, default : "empty"},
    responded : {type : Boolean, default : false}
});

module.exports = recipientSchema;