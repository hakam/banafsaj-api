const db = require("../models");
const Asset = db.asset;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Asset in the database
    Asset.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Asset."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('asset', req.query)
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

    Asset.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Asset with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Asset.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Asset was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Asset with id=${id}. Maybe Asset was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Asset with id=" + id
            });
        });
};
exports.delete = async(req, res) => {
    const id = req.params.id;

    Asset.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Asset was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Asset with id=${id}. Maybe Asset was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Asset with id=" + id
            });
        });
};
