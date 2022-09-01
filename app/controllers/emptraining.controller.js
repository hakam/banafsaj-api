const db = require("../models");
const Emptraining = db.emptraining;
const DataLoader = require('../config/core/dataloader')

exports.create = (req, res) => {
    // Save Emptraining in the database
    Emptraining.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Emptraining."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('emptraining', req.query)
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

    Emptraining.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Emptraining with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Emptraining.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Emptraining was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Emptraining with id=${id}. Maybe Emptraining was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Emptraining with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Emptraining.findByPk(id)

    Emptraining.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Emptraining was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Emptraining with id=${id}. Maybe Emptraining was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Emptraining with id=" + id
            });
        });
};
