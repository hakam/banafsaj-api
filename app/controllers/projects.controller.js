const db = require("../models");
const projects = db.projects;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save projects in the database
    projects.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the projects."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('projects', req.query)
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

    projects.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving projects with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    projects.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "projects was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update projects with id=${id}. Maybe projects was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating projects with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    projects.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "projects was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete projects with id=${id}. Maybe projects was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete projects with id=" + id
            });
        });
};
