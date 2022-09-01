const db = require("../models");
const Tasks = db.tasks;
const DataLoader = require('../config/core/dataloader')
const Notifications = db.notifications;


exports.create = (req, res) => {
    // Save Tasks in the database
    if(req.user.employeeId != req.body.assignee){
        console.log("need");
        Tasks.create(req.body)
        .then(async data => {
            Notifications.create({
                employeeId : req.body.assignee,
                message : "You Have New Task Assignment",
                path:'open-task/'+data.id,
                sender:req.user.employeeId
                })
                let room = 'room-'+req.body.assignee
                req.io.sockets.in(room).emit('message', { content: "insert" });
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tasks."
            });
        });
    }else{
        Tasks.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tasks."
            });
        });
    }
    
};
exports.findAll = async (req, res) => {

   try {
        const dataLoader = new DataLoader('tasks', req.query)
        const result = await dataLoader.load()
        for (let p = 0; p < result.data.length; p++) {
            const element = result.data[p];
            const items = element.tags.split(',').map(Number);
            element.tags = items
        }
        res.json(result)
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving Transactionss."
                        });
    } 


};
exports.findAllByGroup = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('tasks', req.query)
        const result = await dataLoader.load()
        for (let p = 0; p < result.data.length; p++) {
            const element = result.data[p];
          for  (let t = 0; t < element.items.length; t++ ){
            const item = element.items[t];
            const items = item.tags.split(',').map(Number);
            item.tags = items
            }
            
        }
        res.json(result)
        
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while retrieving Transactionss."
                        });
    } 


};
exports.findOne = (req, res) => {
    const id = req.params.id;
   
    Tasks.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tasks with id=" + id
            });
        });
};
exports.update = async (req, res) => {
    const id = req.params.id;
   try {
    const oldData = await Tasks.findOne({where: {id: id},raw: true})
    if(oldData.assignee != req.body.assignee){
        await Tasks.update(req.body, {
            where: { id: id },
            individualHooks: true
        }) 
        
        Notifications.create({
		employeeId : req.body.assignee,
        message : "You Have New Task Assignment",
        path:'open-task/'+id,
        sender:req.user.employeeId
        })
        let room = 'room-'+req.body.assignee
        console.log("send message to",room);
        req.io.sockets.in(room).emit('message', { content: "update" });
      
        res.send({
            message: "Tasks was Update successfully!"
        });
    }else{
       
        await Tasks.update(req.body, {
            where: { id: id },
            individualHooks: true
        }) 
        res.send({
            message: "Tasks was Update successfully!"
        });
    }
  
   } catch (error) {
    res.status(500).send({
        message: "Error updating Tasks with id=" + error
    });
   }
   
      
};
exports.delete = async(req, res) => {
    const id = req.params.id;

    Tasks.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Tasks was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tasks with id=${id}. Maybe Tasks was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tasks with id=" + id
            });
        });
};
