    const dashboards = require("../controllers/dashboards.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new dashboards
    router.post("/dashboards",auth,reqPerm, dashboards.create);
  
    // Retrieve all dashboards
    router.get("/dashboards",auth,reqPerm, dashboards.findAll);
  
   // Retrieve a single dashboards with id
    router.get("/dashboards/:id",auth,reqPerm, dashboards.findOne);
  
    // Update a dashboards with id
    router.put("/dashboards/:id",auth,reqPerm,dashboards.update);
  
    // Delete a dashboards with id
    router.delete("/dashboards/:id",auth,reqPerm, dashboards.delete);
  
    // Create a new dashboards
  

    module.exports = router
