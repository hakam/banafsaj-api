    const empregister = require("../controllers/empregister.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new empregister
    router.post("/empregister",auth,reqPerm, empregister.create);
  
    // Retrieve all empregister
    router.get("/empregister",auth,reqPerm, empregister.findAll);
  
   // Retrieve a single empregister with id
    router.get("/empregister/:id",auth,reqPerm, empregister.findOne);
  
    // Update a empregister with id
    router.put("/empregister/:id",auth,reqPerm,empregister.update);
  
    // Delete a empregister with id
    router.delete("/empregister/:id",auth,reqPerm, empregister.delete);
  
    // Create a new empregister
  

    module.exports = router
