const db = require("../models");
const Payment_threshold = db.payment_threshold;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Payment_threshold in the database
    Payment_threshold.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Payment_threshold."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('payment_threshold', req.query)
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

    Payment_threshold.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Payment_threshold with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Payment_threshold.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Payment_threshold was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Payment_threshold with id=${id}. Maybe Payment_threshold was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Payment_threshold with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Payment_threshold.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Payment_threshold was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Payment_threshold with id=${id}. Maybe Payment_threshold was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Payment_threshold with id=" + id
            });
        });
};
