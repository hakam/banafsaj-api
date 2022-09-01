const db = require("../models");
const Empmissions = db.empmissions;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Empmissions in the database
    Empmissions.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Empmissions."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('empmissions', req.query)
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

    Empmissions.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Empmissions with id=" + id
            });
        });
};
exports.update = async (req, res) => {
    const id = req.params.id;

    Empmissions.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Empmissions was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Empmissions with id=${id}. Maybe Empmissions was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Empmissions with id=" + id
            });
        });
};
exports.delete = async(req, res) => {
    const id = req.params.id;

    Empmissions.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Empmissions was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Empmissions with id=${id}. Maybe Empmissions was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Empmissions with id=" + id
            });
        });
};
