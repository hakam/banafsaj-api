    const commentDocs = require("../controllers/commentDocs.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");
    const upload = require("../middleware/uploaddocumentNew");

    var router = require("express").Router();
  
    // Create a new commentDocs
    router.post("/commentDocs",auth,reqPerm, commentDocs.create);
    router.post("/commentDocs/uploadSingle",upload.single("file"), commentDocs.uploadDocSingle);
    router.post("/commentDocs/uploadMulti",upload.array("files",5), commentDocs.uploadDocMulti);
    router.get("/commentDocs/file/get/:folder/:id/:name",auth,reqPerm,commentDocs.getFile);

    // Retrieve all commentDocs
    router.get("/commentDocs",auth,reqPerm, commentDocs.findAll);
  
   // Retrieve a single commentDocs with id
    router.get("/commentDocs/:id",auth,reqPerm, commentDocs.findOne);
  
    // Update a commentDocs with id
    router.put("/commentDocs/:id",auth,reqPerm, commentDocs.update);
  
    // Delete a commentDocs with id
    router.delete("/commentDocs/:id",auth,reqPerm, commentDocs.delete);
  
    // Create a new commentDocs
  

    module.exports = router
