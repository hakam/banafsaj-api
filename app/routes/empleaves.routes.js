    const empleaves = require("../controllers/empleaves.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");
    const upload = require("../middleware/uploaddocumentNew");

    var router = require("express").Router();
  
    // Create a new empleaves
    router.post("/empleaves",auth,upload.single("file"), empleaves.create);
    router.get("/empleaves/file/get/:folder/:id/:name",auth,reqPerm,empleaves.getFile);

    // Retrieve all empleaves
    router.get("/empleaves",auth,reqPerm, empleaves.findAll);
  
   // Retrieve a single empleaves with id
    router.get("/empleaves/:id",auth,reqPerm, empleaves.findOne);
  
    // Update a empleaves with id
    router.put("/empleaves/:id",auth,reqPerm, empleaves.update);
  
    // Delete a empleaves with id
    router.delete("/empleaves/:id",auth,reqPerm, empleaves.delete);
  
    // Create a new empleaves
  

    module.exports = router
