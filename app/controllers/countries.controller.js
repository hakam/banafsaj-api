const db = require("../models");
const Countries = db.countries;
const DataLoader = require('../config/core/dataloader')

exports.create = (req, res) => {
    // Save Countries in the database
    Countries.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Countries."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('countries', req.query)
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

    Countries.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Countries with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Countries.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Countries was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Countries with id=${id}. Maybe Countries was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Countries with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Countries.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Countries was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Countries with id=${id}. Maybe Countries was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Countries with id=" + id
            });
        });
};
