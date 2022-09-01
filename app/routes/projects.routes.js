    const projects = require("../controllers/projects.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new projects
    router.post("/projects",auth,reqPerm, projects.create);
  
    // Retrieve all projects
    router.get("/projects",auth,reqPerm, projects.findAll);
  
   // Retrieve a single projects with id
    router.get("/projects/:id",auth,reqPerm, projects.findOne);
  
    // Update a projects with id
    router.put("/projects/:id",auth,reqPerm, projects.update);
  
    // Delete a projects with id
    router.delete("/projects/:id",auth,reqPerm, projects.delete);
  
    // Create a new projects
  

    module.exports = router
