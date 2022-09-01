    const project_gantt = require("../controllers/project_gantt.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new Project_gantt
    router.post("/project_gantt",auth,reqPerm, project_gantt.create);
  
    // Retrieve all Project_gantt
    router.get("/project_gantt",auth,reqPerm, project_gantt.findAll);
  
   // Retrieve a single Project_gantt with id
    router.get("/project_gantt/:id",auth,reqPerm, project_gantt.findOne);
  
    // Update a Project_gantt with id
    router.put("/project_gantt/:id",auth,reqPerm, project_gantt.update);
  
    // Delete a Project_gantt with id
    router.delete("/project_gantt/:id",auth,reqPerm, project_gantt.delete);
  
    // Create a new Project_gantt
  

    module.exports = router
