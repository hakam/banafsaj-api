    const beneficiariesproject = require("../controllers/beneficiaries_project.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new beneficiariesproject
    router.post("/beneficiariesproject",auth,reqPerm, beneficiariesproject.create);
  
    // Retrieve all beneficiariesproject
    router.get("/beneficiariesproject",auth,reqPerm, beneficiariesproject.findAll);
  
   // Retrieve a single beneficiariesproject with id
    router.get("/beneficiariesproject/:id",auth,reqPerm, beneficiariesproject.findOne);
  
    // Update a beneficiariesproject with id
    router.put("/beneficiariesproject/:id",auth,reqPerm, beneficiariesproject.update);
  
    // Delete a beneficiariesproject with id
    router.delete("/beneficiariesproject/:id",auth,reqPerm, beneficiariesproject.delete);
  
    // Create a new beneficiariesproject
  

    module.exports = router
