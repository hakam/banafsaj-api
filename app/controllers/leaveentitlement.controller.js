const db = require("../models");
const Leaveentitlement = db.leaveentitlement;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Leaveentitlement in the database
    Leaveentitlement.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Leaveentitlement."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('leaveentitlement', req.query)
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

    Leaveentitlement.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Leaveentitlement with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Leaveentitlement.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Leaveentitlement was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Leaveentitlement with id=${id}. Maybe Leaveentitlement was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Leaveentitlement with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Leaveentitlement.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Leaveentitlement was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Leaveentitlement with id=${id}. Maybe Leaveentitlement was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Leaveentitlement with id=" + id
            });
        });
};
