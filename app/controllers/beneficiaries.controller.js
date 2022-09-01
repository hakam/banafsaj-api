const db = require("../models");
const Beneficiaries = db.beneficiaries;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Beneficiaries in the database
    Beneficiaries.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Beneficiaries."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('beneficiaries', req.query)
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

    Beneficiaries.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Beneficiaries with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Beneficiaries.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Beneficiaries was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Beneficiaries with id=${id}. Maybe Beneficiaries was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Beneficiaries with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Beneficiaries.findByPk(id)

    Beneficiaries.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {

                res.send({
                    message: "Beneficiaries was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Beneficiaries with id=${id}. Maybe Beneficiaries was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Beneficiaries with id=" + id
            });
        });
};
