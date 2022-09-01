const db = require("../models");
const Holidays = db.holidays;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Holidays in the database
    Holidays.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Holidays."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('holidays', req.query)
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

    Holidays.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Holidays with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Holidays.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Holidays was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Holidays with id=${id}. Maybe Holidays was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Holidays with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Holidays.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Holidays was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Holidays with id=${id}. Maybe Holidays was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Holidays with id=" + id
            });
        });
};
