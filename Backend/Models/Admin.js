const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let adminSchema = new Schema({
  name:String,
  password: String,
  email:String

}, {
    collection: 'Admins'
  })
module.exports = mongoose.model('admin', adminSchema)
