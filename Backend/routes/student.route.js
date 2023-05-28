let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
// Product Model
let studentSchema = require('../Models/Student');
// CREATE Product
router.route('/addLearner').post(async(req, res, next) => {

  console.log(req.body)
  console.log(req.body)

  
  const response = await studentSchema.create(req.body);
  res.json(response)
});


// READ Products
router.route('/').get(async(req, res) => {
    
  const data =  await studentSchema.find();
  if(data)
    res.json(data);
})



// Get Single Product
router.route('/getLearner').get(async(req, res) => {
  console.log(req.query.email)
  const user = await studentSchema.find({"email":req.query.email});
  console.log(user)
  res.json(user)


})


// Get Single Product
router.route('/get-student-bynameAndId').get(async(req, res) => {
  console.log(req.query.name)
  const user = await studentSchema.find({"name":req.query.name,"_id":req.query.id});
  console.log(user)
  res.json(user)


})


// Update Product
router.route('/update-student/').put(async(req, res, next) => {
  console.log(req.query.id)
  console.log(req.body)
  const data= await studentSchema.findByIdAndUpdate(req.query.id, {
    $set: req.body
  })

  const updatedData = await studentSchema.findById(req.query.id); 
  res.json(updatedData);
})



// Delete Product
router.route('/delete-student/').delete(async(req, res, next) => {
  let user = await studentSchema.findById(req.query.id)
  console.log(user)
  let result = await studentSchema.findByIdAndRemove(req.query.id)
  res.json(result);
})
module.exports = router;