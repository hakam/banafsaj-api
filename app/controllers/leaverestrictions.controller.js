const db = require("../models");
const Leaverestrictions = db.leaverestrictions;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Leaverestrictions in the database
    Leaverestrictions.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Leaverestrictions."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('leaverestrictions', req.query)
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

    Leaverestrictions.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Leaverestrictions with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Leaverestrictions.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Leaverestrictions was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Leaverestrictions with id=${id}. Maybe Leaverestrictions was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Leaverestrictions with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Leaverestrictions.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Leaverestrictions was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Leaverestrictions with id=${id}. Maybe Leaverestrictions was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Leaverestrictions with id=" + id
            });
        });
};
