const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let studentSchema = new Schema({
  name:String,
  password: String,
  email:String

}, {
    collection: 'Students'
  })
module.exports = mongoose.model('Student', studentSchema)
