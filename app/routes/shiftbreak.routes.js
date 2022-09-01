    const shiftbreak = require("../controllers/shiftbreak.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new shiftbreak
    router.post("/shiftbreak",auth,reqPerm, shiftbreak.create);
  
    // Retrieve all shiftbreak
    router.get("/shiftbreak",auth,reqPerm, shiftbreak.findAll);
  
   // Retrieve a single shiftbreak with id
    router.get("/shiftbreak/:id",auth,reqPerm, shiftbreak.findOne);
  
    // Update a shiftbreak with id
    router.put("/shiftbreak/:id",auth,reqPerm, shiftbreak.update);
  
    // Delete a shiftbreak with id
    router.delete("/shiftbreak/:id",auth,reqPerm, shiftbreak.delete);
  
    // Create a new shiftbreak
  

    module.exports = router
