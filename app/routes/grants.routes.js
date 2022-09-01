    const grants = require("../controllers/grants.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new grants
    router.post("/grants",auth,reqPerm, grants.create);
    router.post("/grants/grantotproject",auth,reqPerm, grants.convertGrantToProject);
    // Retrieve all grants
    router.get("/grants",auth,reqPerm, grants.findAll);
    router.get("/grantsWithPrograms",auth,reqPerm, grants.findAllWithPrograms);

   // Retrieve a single grants with id
    router.get("/grants/:id",auth,reqPerm, grants.findOne);
  
    // Update a grants with id
    router.put("/grants/:id",auth,reqPerm, grants.update);
  
    // Delete a grants with id
    router.delete("/grants/:id",auth,reqPerm, grants.delete);
  
    // Create a new grants
  

    module.exports = router
