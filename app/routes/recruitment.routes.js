    const recruitment = require("../controllers/recruitment.controller.js");
    const auth = require("../middleware/auth.js");
  
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new recruitment
    router.post("/recruitment",auth,reqPerm, recruitment.create);
  
    // Retrieve all recruitment
    router.get("/recruitment",auth,reqPerm, recruitment.findAll);
  
   // Retrieve a single recruitment with id
    router.get("/recruitment/:id",auth,reqPerm, recruitment.findOne);
  
    // Update a recruitment with id
    router.put("/recruitment/:id",auth,reqPerm,recruitment.update);
  
    // Delete a recruitment with id
    router.delete("/recruitment/:id",auth,reqPerm, recruitment.delete);
  
    // Create a new recruitment
  

    module.exports = router
