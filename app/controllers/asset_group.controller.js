const db = require("../models");
const Assetgroup = db.assetgroup;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Assetgroup in the database
    Assetgroup.create(req.body)
        .then(async data => {


            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Assetgroup."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('assetgroup', req.query)
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

    Assetgroup.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Assetgroup with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Assetgroup.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Assetgroup was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Assetgroup with id=${id}. Maybe Assetgroup was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Assetgroup with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Assetgroup.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Assetgroup was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Assetgroup with id=${id}. Maybe Assetgroup was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Assetgroup with id=" + id
            });
        });
};
