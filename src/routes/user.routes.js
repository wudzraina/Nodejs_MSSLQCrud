
module.exports = app =>{
    
  const user = require("../controllers/user.controller")

  var router = require("express").Router()

    // Create a new Tutorial
  router.post("/create", user.create)
 

  // Retrieve a single user with id  
  router.get("/:id", user.findOne)

   // Retrieve all the users 
   router.get("/", user.findAll)

  // // Update a Tutorial with id
  // router.put("/:id", user.update)

  // // Delete a Tutorial with id
  // router.delete("/:id", user.delete)

  // // Delete all Tutorials
  // router.delete("/", user.deleteAll)

  // app.use('/api/tutorials', router);
  
  app.use('/api/v1.0/users', router)



}
