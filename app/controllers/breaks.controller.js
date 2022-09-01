const db = require("../models");
const Breaks = db.breaks;
const DataLoader = require('../config/core/dataloader')
const Auditlog = db.auditlog;


exports.create = (req, res) => {
    // Save Breaks in the database
    Breaks.create(req.body)
        .then( async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Breaks."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('breaks', req.query)
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

    Breaks.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Breaks with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Breaks.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Breaks was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Breaks with id=${id}. Maybe Breaks was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Breaks with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Breaks.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num == 1) {
                res.send({
                    message: "Breaks was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Breaks with id=${id}. Maybe Breaks was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Breaks with id=" + id
            });
        });
};
