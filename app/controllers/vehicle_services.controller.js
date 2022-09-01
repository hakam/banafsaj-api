const db = require("../models");
const Vehicleservices = db.vehicleservices;
const DataLoader = require('../config/core/dataloader')

exports.create = (req, res) => {
    // Save Vehicleservices in the database
    Vehicleservices.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vehicleservices."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('vehicleservices', req.query)
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

    Vehicleservices.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vehicleservices with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Vehicleservices.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Vehicleservices was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vehicleservices with id=${id}. Maybe Vehicleservices was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vehicleservices with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Vehicleservices.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Vehicleservices was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Vehicleservices with id=${id}. Maybe Vehicleservices was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Vehicleservices with id=" + id
            });
        });
};
