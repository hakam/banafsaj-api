    const news = require("../controllers/news.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new news
    router.post("/news",auth,reqPerm, news.create);
  
    // Retrieve all news
    router.get("/news",auth,reqPerm, news.findAll);
  
   // Retrieve a single news with id
    router.get("/news/:id",auth,reqPerm, news.findOne);
  
    // Update a news with id
    router.put("/news/:id",auth,reqPerm, news.update);
  
    // Delete a news with id
    router.delete("/news/:id",auth,reqPerm, news.delete);
  
    // Create a new news
  

    module.exports = router
