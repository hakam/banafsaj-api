    const employee = require("../controllers/employee.controller.js");
    const auth = require("../middleware/auth.js");
    const upload = require("../middleware/uploaddocument");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new employee
    router.post("/employee",auth,reqPerm, employee.create);
    router.post("/employee/empUser",auth,reqPerm, employee.employeeWithUser);
  
    // Retrieve all employee
    router.get("/employee",auth,reqPerm, employee.findAll);
    router.post("/employee/uploadavatar",upload.single("file"), employee.uploadDoc);

  
   // Retrieve a single employee with id
    router.get("/employee/:id",auth,reqPerm, employee.findOne);
  
    // Update a employee with id
    router.put("/employee/:id",auth,reqPerm, employee.update);
    router.put("/employee/mobilemail/:id",auth,reqPerm, employee.updateMailMobile);
  
    // Delete a employee with id
    router.delete("/employee/:id",auth,reqPerm, employee.delete);
  
    // Create a new employee
  
    
    module.exports = router
