const db = require("../models");
const Payroll = db.payroll;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Payroll in the database
    Payroll.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Payroll."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('payroll', req.query)
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

    Payroll.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Payroll with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Payroll.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Payroll was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Payroll with id=${id}. Maybe Payroll was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Payroll with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Payroll.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Payroll was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Payroll with id=${id}. Maybe Payroll was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Payroll with id=" + id
            });
        });
};
