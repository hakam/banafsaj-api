const db = require("../models");
const DistributionRequest = db.distributionRequest;
const DataLoader = require('../config/core/dataloader')
const DistributionRequestItems = db.distributionRequestItems;


exports.create = (req, res) => {
    // Save DistributionRequest in the database
    DistributionRequest.create(req.body)
        .then(async data => {
            req.body.items.map(p=>{ p.drId = data.id ;return p})
            await DistributionRequestItems.bulkCreate(req.body.items)  

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the DistributionRequest."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('distributionRequest', req.query)
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

    DistributionRequest.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving DistributionRequest with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    DistributionRequest.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "DistributionRequest was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update DistributionRequest with id=${id}. Maybe DistributionRequest was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating DistributionRequest with id=" + id
            });
        });
};
exports.delete = async(req, res) => {
    const id = req.params.id;

    DistributionRequest.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "DistributionRequest was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete DistributionRequest with id=${id}. Maybe DistributionRequest was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete DistributionRequest with id=" + id
            });
        });
};
