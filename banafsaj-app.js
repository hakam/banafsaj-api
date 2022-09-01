const { createServer } = require("http");
//const { createServer } = require("https");
const express = require("express");
const socketIo = require("socket.io");
const app = express();
// const server = createServer({
//   key: privateKey,
//   cert: certificate
// },app );
const server = createServer(app);
// const server = createServer({
//   key: privateKey,
//   cert: certificate
// }, app);
const io = socketIo(server, { cors: { origin: "*" } });
const cors = require("cors");
const db = require("./app/models");
const https = require('https');
// const fs = require('fs');

const listEndpoints = require('express-list-endpoints')

const route = require('./app/routes')

const RbacEntityFunction = db.rbacEntityFunction;

app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb', extended: true }))
app.use(express.static('public'));
var corsOptions = {
  origin: ["http://localhost:4200", "https://erp.sened.ngo"]
};
// var privateKey = fs.readFileSync( './app/config/ssl/privkey.pem');
// var certificate = fs.readFileSync('./app/config/ssl/fullchain.pem' );
const PORT = process.env.PORT || 8024;
const onlineUsers =  new Map()
const users = {};

io.on('connection', function (socket) {
 
  socket.on('subscribe', function (room,currentUser) {
    users[socket.id] = currentUser.employeeId;
    socket['nickname'] = currentUser.username;
  
    socket.join(room);
  
    onlineUsers.set(currentUser.employeeId,{username:currentUser.username,name:currentUser.firstName,lastName:currentUser.lastName})
   
  
    console.log(onlineUsers);
  })
  socket.on("disconnect", (reason) => {
    let userId = users[socket.id]
    delete users[socket.id]
    let exists = Object.values(users).includes(userId);
   
    if(exists == false) {
      onlineUsers.delete(userId)
    }
  
    console.log(onlineUsers);
    
  });
  socket.on('unsubscribe', function (room) {
      socket.leave(room);
  })


 


});;

app.use((req, res, next) => {
  req.io = io;
  req.onlineUsers = onlineUsers;
  return next();
});



app.use(cors(corsOptions));

db.sequelize.sync({ alter: true });

//app.use(morgan("combined", { stream: logger.stream.write }));

app.use('/api', route)

//role
const data = listEndpoints(app)
const forLoop = async _ => {
  console.log('Start')
  for (var i = 0; i < data.length; i++) {
    let item = data[i];
    for (let p = 0; p < item.methods.length; p++) {
      var str = item.path
      str = str.substring(str.indexOf("/") + 5);
      if (str.indexOf('/') >= 0) {
        str = str.substring(0, str.indexOf('/'));
      }
      const role = await RbacEntityFunction.findOne({ where: { path: item.path, action: item.methods[p] }, raw: true })
      if (!role) {
        const fullUrl = item.path.split("/")
        if (fullUrl.length > 4) {
          console.log(fullUrl.length);
        }
        switch (item.methods[p]) {
          case "PUT":
            await RbacEntityFunction.create({ createdBy: 1, path: item.path, action: item.methods[p], entity: str, updatedBy: 1, actionType: "Default", actionName: "Update" })
            break;
          case "DELETE":
            await RbacEntityFunction.create({ createdBy: 1, path: item.path, action: item.methods[p], entity: str, updatedBy: 1, actionType: "Default", actionName: "Delete" })
            break;
          case "GET":
            if (fullUrl.length == 3) {
              await RbacEntityFunction.create({ createdBy: 1, path: item.path, action: item.methods[p], entity: str, updatedBy: 1, actionType: "Default", actionName: "List" })
            } else if (fullUrl.length == 4) {
              if (fullUrl[3] == ":id") {
                await RbacEntityFunction.create({ createdBy: 1, path: item.path, action: item.methods[p], entity: str, updatedBy: 1, actionType: "Default", actionName: "View" })
              }
            } else if (fullUrl.length > 4) {
              await RbacEntityFunction.create({ createdBy: 1, path: item.path, action: item.methods[p], entity: str, updatedBy: 1, actionType: "Advance" })
            }
            break;
          case "POST":
            if (fullUrl.length == 3) {
              await RbacEntityFunction.create({ createdBy: 1, path: item.path, action: item.methods[p], entity: str, updatedBy: 1, actionType: "Default", actionName: "Add" })
            } else if (fullUrl.length == 4) {
              if (fullUrl[3] == ":id") {
                await RbacEntityFunction.create({ createdBy: 1, path: item.path, action: item.methods[p], entity: str, updatedBy: 1, actionType: "Default" })
              }
            } else if (fullUrl.length > 4) {
              await RbacEntityFunction.create({ createdBy: 1, path: item.path, action: item.methods[p], entity: str, updatedBy: 1, actionType: "Advance" })
            }
            break;
        }
      }
    }
  }
}


//forLoop();

// end of role


// use ssl 



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//use no ssl 
// const PORT = 8014;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);

// });