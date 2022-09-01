const db = require("../models");
const PrsSteps = db.prsSteps;
const DataLoader = require('../config/core/dataloader')


exports.create = async (req, res) => {
    // Save PrsSteps in the database
    PrsSteps.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the PrsSteps."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('prsSteps', req.query)
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

    PrsSteps.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving PrsSteps with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    PrsSteps.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "PrsSteps was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update PrsSteps with id=${id}. Maybe PrsSteps was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating PrsSteps with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    PrsSteps.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "PrsSteps was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete PrsSteps with id=${id}. Maybe PrsSteps was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete PrsSteps with id=" + id
            });
        });
};
