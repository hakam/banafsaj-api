const db = require("../models");
const GrantsCities = db.grantsCities;

const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save GrantsCities in the database
    GrantsCities.create(req.body)
        .then(async data => {
      
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the GrantsCities."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('grantsCities', req.query)
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

    GrantsCities.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving GrantsCities with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    GrantsCities.update(req.body, {
        where: { id: id }
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "GrantsCities was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update GrantsCities with id=${id}. Maybe GrantsCities was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating GrantsCities with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    const cid = req.params.cid;
    GrantsCities.destroy({
        where: { grantId: id,cityId:cid },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "GrantsCities was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete GrantsCities with id=${id}. Maybe GrantsCities was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete GrantsCities with id=" + id
            });
        });
};


