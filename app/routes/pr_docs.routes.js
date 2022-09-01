    const pr_docs = require("../controllers/pr_docs.controller.js");
    const auth = require("../middleware/auth.js");
    const upload = require("../middleware/uploaddocument");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new pr_docs
    router.post("/pr_docs",auth,reqPerm, pr_docs.create);
    router.post("/pr_docs/uploaddoc",upload.single("file"), pr_docs.uploadDoc);

    // Retrieve all pr_docs
    router.get("/pr_docs",auth,reqPerm, pr_docs.findAll);
  
   // Retrieve a single pr_docs with id
    router.get("/pr_docs/:id",auth,reqPerm, pr_docs.findOne);
  
    // Update a pr_docs with id
    router.put("/pr_docs/:id",auth,reqPerm,pr_docs.update);
  
    // Delete a pr_docs with id
    router.delete("/pr_docs/:id",auth,reqPerm, pr_docs.delete);
  
    // Create a new pr_docs
  

    module.exports = router
