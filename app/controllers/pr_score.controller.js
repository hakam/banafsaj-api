const db = require("../models");
const Prscore = db.prscore;
const DataLoader = require('../config/core/dataloader')
const Auditlog = db.auditlog;


exports.create = (req, res) => {
    // Save Prscore in the database
    Prscore.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prscore."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('prscore', req.query)
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

    Prscore.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Prscore with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Prscore.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Prscore was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prscore with id=${id}. Maybe Prscore was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prscore with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Prscore.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Prscore was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Prscore with id=${id}. Maybe Prscore was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Prscore with id=" + id
            });
        });
};
