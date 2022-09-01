    const rbacEntityFunction = require("../controllers/rbacEntityFunction.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new rbacEntityFunction
    router.post("/rbacEntityFunction",auth,reqPerm, rbacEntityFunction.create);
  
    // Retrieve all rbacEntityFunction
    router.get("/rbacEntityFunction",auth,reqPerm, rbacEntityFunction.findAll);
  
   // Retrieve a single rbacEntityFunction with id
    router.get("/rbacEntityFunction/:id",auth,reqPerm, rbacEntityFunction.findOne);
  
    // Update a rbacEntityFunction with id
    router.put("/rbacEntityFunction/:id",auth,reqPerm, rbacEntityFunction.update);
  
    // Delete a rbacEntityFunction with id
    router.delete("/rbacEntityFunction/:id",auth,reqPerm, rbacEntityFunction.delete);
  
    // Create a new rbacEntityFunction
  

    module.exports = router
