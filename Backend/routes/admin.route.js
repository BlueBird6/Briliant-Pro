let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
// Product Model
let adminSchema = require('../Models/Admin');
// CREATE Product
router.route('/addAdmin').post(async(req, res, next) => {

  console.log(req.body)
  console.log(req.body)

  
  const response = await adminSchema.create(req.body);
  res.json(response)
});


// READ Products
router.route('/').get(async(req, res) => {
    
  const data =  await adminSchema.find();
  if(data)
    res.json(data);
})



// Get Single Product
router.route('/getAdmin').get(async(req, res) => {
  console.log(req.query.email)
  const user = await adminSchema.find({"email":req.query.email});
  console.log(user)
  res.json(user)


})


// Get Single Product
router.route('/get-admin-bynameAndId').get(async(req, res) => {
  console.log(req.query.name)
  const user = await adminSchema.find({"name":req.query.name,"_id":req.query.id});
  console.log(user)
  res.json(user)


})


// Update Product
router.route('/update-admin/').put(async(req, res, next) => {
  console.log(req.query.id)
  console.log(req.body)
  const data= await adminSchema.findByIdAndUpdate(req.query.id, {
    $set: req.body
  })

  const updatedData = await adminSchema.findById(req.query.id); 
  res.json(updatedData);
})



// Delete Product
router.route('/delete-admin/').delete(async(req, res, next) => {
  let user = await adminSchema.findById(req.query.id)
  console.log(user)
  let result = await adminSchema.findByIdAndRemove(req.query.id)
  res.json(result);
})
module.exports = router;