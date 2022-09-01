
    const currency = require("../controllers/currency.controller.js");
    const auth = require("../middleware/auth")
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new currency
    router.post("/currency",auth,reqPerm,currency.create);
  
    // Retrieve all currency
    router.get("/currency",auth,reqPerm,currency.findAll);
  
   // Retrieve a single currency with id
    router.get("/currency/:id",auth,reqPerm, currency.findOne);
  
    // Update a currency with id
    router.put("/currency/:id",auth,reqPerm, currency.update);
  
    // Delete a currency with id
    router.delete("/currency/:id",auth,reqPerm, currency.delete);
  
    // Create a new currency
    module.exports = router
