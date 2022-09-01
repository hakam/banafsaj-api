const db = require("../models");
const DistributionRequestItems = db.distributionRequestItems;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save DistributionRequestItems in the database
    DistributionRequestItems.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the DistributionRequestItems."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('distributionRequestItems', req.query)
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

    DistributionRequestItems.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving DistributionRequestItems with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    DistributionRequestItems.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "DistributionRequestItems was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update DistributionRequestItems with id=${id}. Maybe DistributionRequestItems was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating DistributionRequestItems with id=" + id
            });
        });
};
exports.delete = async(req, res) => {
    const id = req.params.id;

    DistributionRequestItems.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "DistributionRequestItems was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete DistributionRequestItems with id=${id}. Maybe DistributionRequestItems was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete DistributionRequestItems with id=" + id
            });
        });
};
