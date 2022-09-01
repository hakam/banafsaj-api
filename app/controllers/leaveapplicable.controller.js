const db = require("../models");
const Leaveapplicable = db.Leaveapplicable;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Leaveapplicable in the database
    Leaveapplicable.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Leaveapplicable."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('Leaveapplicable', req.query)
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

    Leaveapplicable.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Leaveapplicable with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Leaveapplicable.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Leaveapplicable was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Leaveapplicable with id=${id}. Maybe Leaveapplicable was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Leaveapplicable with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Leaveapplicable.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Leaveapplicable was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Leaveapplicable with id=${id}. Maybe Leaveapplicable was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Leaveapplicable with id=" + id
            });
        });
};
