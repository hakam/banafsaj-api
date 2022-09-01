const db = require("../models");
const Task_status = db.task_status;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Task_status in the database
    Task_status.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task_status."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('task_status', req.query)
        const result = await dataLoader.load()
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

    Task_status.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task_status with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Task_status.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Task_status was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Task_status with id=${id}. Maybe Task_status was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task_status with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Task_status.findByPk(id)
    Task_status.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Task_status was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task_status with id=${id}. Maybe Task_status was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task_status with id=" + id
            });
        });
};
