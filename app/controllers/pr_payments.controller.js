const db = require("../models");
const Prpayments = db.prpayments;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Prpayments in the database
    Prpayments.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prpayments."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('rpayments', req.query)
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

    Prpayments.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Prpayments with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Prpayments.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Prpayments was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prpayments with id=${id}. Maybe Prpayments was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prpayments with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Prpayments.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Prpayments was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Prpayments with id=${id}. Maybe Prpayments was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Prpayments with id=" + id
            });
        });
};
