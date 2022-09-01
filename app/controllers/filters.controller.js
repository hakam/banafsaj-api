const db = require("../models");
const Filters = db.filters;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Filters in the database
    Filters.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Filters."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('filters', req.query)
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

    Filters.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Filters with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Filters.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Filters was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Filters with id=${id}. Maybe Filters was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Filters with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Filters.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Filters was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Filters with id=${id}. Maybe Filters was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Filters with id=" + id
            });
        });
};
