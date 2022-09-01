    const proeshd = require("../controllers/proeshd.controller.js");
    const auth = require("../middleware/auth.js");

    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new proeshd
    router.post("/proeshd",auth,reqPerm, proeshd.create);
  
    // Retrieve all proeshd
    router.get("/proeshd",auth,reqPerm, proeshd.findAll);
  
   // Retrieve a single proeshd with id
    router.get("/proeshd/:id",auth,reqPerm, proeshd.findOne);
  
    // Update a proeshd with id
    router.put("/proeshd/:id",auth,reqPerm, proeshd.update);
  
    // Delete a proeshd with id
    router.delete("/proeshd/:id",auth,reqPerm, proeshd.delete);
  
    // Create a new proeshd
  

    module.exports = router
