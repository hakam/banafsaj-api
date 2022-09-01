    const payroll = require("../controllers/payroll.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new payroll
    router.post("/payroll",auth,reqPerm, payroll.create);
  
    // Retrieve all payroll
    router.get("/payroll",auth,reqPerm, payroll.findAll);
  
   // Retrieve a single payroll with id
    router.get("/payroll/:id",auth,reqPerm, payroll.findOne);
  
    // Update a payroll with id
    router.put("/payroll/:id",auth,reqPerm,payroll.update);
  
    // Delete a payroll with id
    router.delete("/payroll/:id",auth,reqPerm, payroll.delete);
  
    // Create a new payroll
  

    module.exports = router
