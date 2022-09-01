const db = require("../models");
const Vehiclelog = db.vehiclelog;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Vehiclelog in the database
    Vehiclelog.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vehiclelog."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('vehiclelog', req.query)
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

    Vehiclelog.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vehiclelog with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Vehiclelog.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Vehiclelog was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vehiclelog with id=${id}. Maybe Vehiclelog was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vehiclelog with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Vehiclelog.destroy({
        where: { id: id }
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Vehiclelog was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Vehiclelog with id=${id}. Maybe Vehiclelog was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Vehiclelog with id=" + id
            });
        });
};
