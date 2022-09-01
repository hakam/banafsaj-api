const db = require("../models");
const Vehiclefines = db.vehiclefines;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Vehiclefines in the database
    Vehiclefines.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vehiclefines."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('vehiclefines', req.query)
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

    Vehiclefines.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vehiclefines with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Vehiclefines.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Vehiclefines was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vehiclefines with id=${id}. Maybe Vehiclefines was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vehiclefines with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Vehiclefines.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Vehiclefines was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Vehiclefines with id=${id}. Maybe Vehiclefines was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Vehiclefines with id=" + id
            });
        });
};
