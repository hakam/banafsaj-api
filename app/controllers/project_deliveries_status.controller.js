const db = require("../models");
const Projectdeliveriesstatus = db.projectdeliveriesstatus;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Projectdeliveriesstatus in the database
    Projectdeliveriesstatus.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the projectdeliveriesstatus."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('projectdeliveriesstatus', req.query)
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

    Projectdeliveriesstatus.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Projectdeliveriesstatus with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Projectdeliveriesstatus.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Projectdeliveriesstatus was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Projectdeliveriesstatus with id=${id}. Maybe Projectdeliveriesstatus was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Projectdeliveriesstatus with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Projectdeliveriesstatus.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Projectdeliveriesstatus was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Projectdeliveriesstatus with id=${id}. Maybe Projectdeliveriesstatus was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Projectdeliveriesstatus with id=" + id
            });
        });
};
