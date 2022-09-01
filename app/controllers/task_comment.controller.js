const db = require("../models");
const Task_comment = db.task_comment;
const DataLoader = require('../config/core/dataloader')
const CommentDocs = db.commentDocs;
const Notifications = db.notifications;


exports.create = (req, res) => {
    // Save Task_comment in the database
    Task_comment.create(req.body)
        .then(async data => {
           if(data.employeeId != data.assignee){
            Notifications.create({
                employeeId : data.assignee,
                message : "You Have New Comment In Task assigned to you ",
                path:'open-task/'+data.taskId,
                sender:req.user.employeeId
                })
                let room = 'room-'+data.assignee
                console.log("send message to",room);
                req.io.sockets.in(room).emit('message', { content: "ya" });
            res.send(data);
           }else{
            res.send(data);
           }
           
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task_comment."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('task_comment', req.query)
        const result = await dataLoader.load()
        for (let p = 0; p < result.data.length; p++) {
            const element = result.data[p];
            let attachment = await CommentDocs.findAll({ where: { commentId: element.id}})
            element['attachment'] = attachment
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

    Task_comment.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task_comment with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Task_comment.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Task_comment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Task_comment with id=${id}. Maybe Task_comment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task_comment with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Task_comment.findByPk(id)
    Task_comment.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Task_comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task_comment with id=${id}. Maybe Task_comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task_comment with id=" + id
            });
        });
};
