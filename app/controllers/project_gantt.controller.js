const db = require("../models");
const Project_gantt = db.project_gantt;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Project_gantt in the database
    Project_gantt.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project_gantt."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('project_gantt', req.query)
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

    Project_gantt.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Project_gantt with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Project_gantt.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Project_gantt was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Project_gantt with id=${id}. Maybe Project_gantt was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Project_gantt with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Project_gantt.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Project_gantt was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Project_gantt with id=${id}. Maybe Project_gantt was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Project_gantt with id=" + id
            });
        });
};
