const db = require("../models");
const Vendorsectors = db.vendorsectors;

const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Vendorsectors in the database
    Vendorsectors.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vendorsectors."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('vendorsectors', req.query)
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

    Vendorsectors.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vendorsectors with id=" + id
            });
        });
};
exports.update = async (req, res) => {
    const id = req.params.id;

    Vendorsectors.update(req.body, {
        where: { id: id },
        individualHooks: true

           })
        .then(async num => {
            if (num[0] == 1) {
                
 
                res.send({
                    message: "Vendorsectors was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot delete Vendorsectors with id=${id}. Maybe Vendorsectors was not found!`
                });

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vendorsectors with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Vendorsectors.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Vendorsectors was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Vendorsectors with id=${id}. Maybe Vendorsectors was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Vendorsectors with id=" + id
            });
        });
};
