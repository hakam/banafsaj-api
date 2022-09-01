const db = require("../models");
const Fuel = db.fuel;
const DataLoader = require('../config/core/dataloader')


exports.create = async (req, res) => {
    // Save Fuel in the database
    Fuel.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Fuel."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('fuel', req.query)
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

    Fuel.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Fuel with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Fuel.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Fuel was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Fuel with id=${id}. Maybe Fuel was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Fuel with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Fuel.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Fuel was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Fuel with id=${id}. Maybe Fuel was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Fuel with id=" + id
            });
        });
};
