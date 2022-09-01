const db = require("../models");
const Municipality = db.municipality;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Municipality in the database
    Municipality.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Municipality."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('municipality', req.query)
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

    Municipality.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Municipality with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Municipality.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Municipality was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Municipality with id=${id}. Maybe Municipality was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Municipality with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Municipality.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            await Auditlog.create({
                createdBy: req.user.id,
                updatedBy: req.user.id,
                tableName: "municipality",
                tableLabel: "Municipality",
                action: "Delete",
                recordId: oldData.id,
                data: oldData
            })
            if (num[0] == 1) {
                res.send({
                    message: "Municipality was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Municipality with id=${id}. Maybe Municipality was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Municipality with id=" + id
            });
        });
};
