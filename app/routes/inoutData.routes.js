    const inoutData = require("../controllers/inoutData.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new inoutData
    router.post("/inoutData",auth,reqPerm, inoutData.create);
    router.post("/inoutData/sync",auth,reqPerm, inoutData.createData);
    // Retrieve all inoutData
    router.get("/inoutData/findmax",auth, inoutData.findMax);

    router.get("/inoutData",auth,reqPerm, inoutData.findAll);
  
   // Retrieve a single inoutData with id
    router.get("/inoutData/:id",auth,reqPerm, inoutData.findOne);
  
    // Update a inoutData with id
    router.put("/inoutData/:id",auth,reqPerm, inoutData.update);
  
    // Delete a inoutData with id
    router.delete("/inoutData/:id",auth,reqPerm, inoutData.delete);
  
    // Create a new inoutData
  

    module.exports = router
