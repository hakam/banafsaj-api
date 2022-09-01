const db = require("../models");
const Shiftbreak = db.shiftbreak;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Shiftbreak in the database
    Shiftbreak.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Shiftbreak."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('shiftbreak', req.query)
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

    Shiftbreak.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Shiftbreak with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Shiftbreak.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Shiftbreak was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Shiftbreak with id=${id}. Maybe Shiftbreak was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Shiftbreak with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Shiftbreak.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Shiftbreak was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Shiftbreak with id=${id}. Maybe Shiftbreak was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Shiftbreak with id=" + id
            });
        });
};
