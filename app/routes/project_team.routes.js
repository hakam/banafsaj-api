    const project_team = require("../controllers/project_team.controller.js");
    const auth = require("../middleware/auth")
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new project_team
    router.post("/project_team",auth,reqPerm, project_team.create);
  
    // Retrieve all project_team
    router.get("/project_team",auth,reqPerm, project_team.findAll);
  
   // Retrieve a single project_team with id
    router.get("/project_team/:id",auth,reqPerm, project_team.findOne);
  
    // Update a project_team with id
    router.put("/project_team/:id",auth,reqPerm, project_team.update);
  
    // Delete a project_team with id
    router.delete("/project_team/:id",auth,reqPerm, project_team.delete);
  
    // Create a new project_team
  

    module.exports = router
