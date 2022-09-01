const db = require("../models");
const Departments = db.departments;
const DataLoader = require('../config/core/dataloader')


exports.create = async (req, res) => {
    // Save Departments in the database
    Departments.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Departments."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('departments', req.query)
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

    Departments.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Departments with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Departments.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Departments was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Departments with id=${id}. Maybe Departments was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Departments with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Departments.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Departments was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Departments with id=${id}. Maybe Departments was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Departments with id=" + id
            });
        });
};
