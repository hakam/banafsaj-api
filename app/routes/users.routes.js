    const users = require("../controllers/users.controller.js");
    const auth = require("../middleware/auth.js");
    
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");


    // Create a new users
    router.post("/users",auth,reqPerm, users.create);
  
    // Retrieve all users
    router.get("/users",auth,reqPerm,users.findAll);
    
  
   // Retrieve a single users with id
    router.get("/users/:id",auth,reqPerm, users.findOne);
  
    // Update a users with id
    router.put("/users/:id",auth,reqPerm, users.update);
  
    // Delete a users with id
    router.delete("/users/:id",auth,reqPerm, users.delete);
  
    router.post("/users/authenticate", users.signin);
    router.post("/users/resetpass", users.restPassword);
    router.post("/users/passmail", users.SendResetMail);
    router.post("/users/resetpassmail", users.ResetPassByMail);
    router.post("/users/refresh", users.refreshToken);
    // Create a new users
  

    module.exports = router
