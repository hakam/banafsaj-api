const db = require("../models");
const Serviceagreements = db.serviceagreements;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Serviceagreements in the database
    Serviceagreements.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Serviceagreements."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('serviceagreements', req.query)
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

    Serviceagreements.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Serviceagreements with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Serviceagreements.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Serviceagreements was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Serviceagreements with id=${id}. Maybe Serviceagreements was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Serviceagreements with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Serviceagreements.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Serviceagreements was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Serviceagreements with id=${id}. Maybe Serviceagreements was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Serviceagreements with id=" + id
            });
        });
};
