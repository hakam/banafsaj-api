const db = require("../models");
const GrantsPrograms = db.grantsPrograms;

const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save GrantsPrograms in the database
    GrantsPrograms.create(req.body)
        .then(async data => {
      
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the GrantsPrograms."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('grantsPrograms', req.query)
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

    GrantsPrograms.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving GrantsPrograms with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    GrantsPrograms.update(req.body, {
        where: { id: id }
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "GrantsPrograms was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update GrantsPrograms with id=${id}. Maybe GrantsPrograms was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating GrantsPrograms with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    GrantsPrograms.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "GrantsPrograms was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete GrantsPrograms with id=${id}. Maybe GrantsPrograms was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete GrantsPrograms with id=" + id
            });
        });
};


