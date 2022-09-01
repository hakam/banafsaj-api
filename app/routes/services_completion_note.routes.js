    const servicescompletionnote = require("../controllers/services_completion_note.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new servicescompletionnote
    router.post("/servicescompletionnote",auth,reqPerm, servicescompletionnote.create);
  
    // Retrieve all servicescompletionnote
    router.get("/servicescompletionnote",auth,reqPerm, servicescompletionnote.findAll);
  
   // Retrieve a single servicescompletionnote with id
    router.get("/servicescompletionnote/:id",auth,reqPerm, servicescompletionnote.findOne);
  
    // Update a servicescompletionnote with id
    router.put("/servicescompletionnote/:id",auth,reqPerm, servicescompletionnote.update);
  
    // Delete a servicescompletionnote with id
    router.delete("/servicescompletionnote/:id",auth,reqPerm, servicescompletionnote.delete);
  
    // Create a new servicescompletionnote
  

    module.exports = router
