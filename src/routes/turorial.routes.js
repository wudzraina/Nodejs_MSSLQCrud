let multer = require('multer');
let upload = multer();

module.exports = app => {

  const tutorials = require("../controllers/tutorial.controller")
  var router = require("express").Router()

  // Create a new Tutorial
  router.post("/create", tutorials.create)
 
  // Retrieve all the Tutorials 
  router.get("/", tutorials.findAll)

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished)

  // Retrieve a single Tutorial with id  
  router.get("/:id", tutorials.findOne)

  // Update a Tutorial with id
  router.put("/put/:id", tutorials.update)

  // Delete a Tutorial with id
  router.delete("/delete/:id", tutorials.delete)

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll)

  // app.use('/api/tutorials', router);
  app.use('/api/v1.0/tutorials', router)

}