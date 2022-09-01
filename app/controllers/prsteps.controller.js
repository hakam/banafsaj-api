const db = require("../models");
const Prsteps = db.prsteps;
const DataLoader = require('../config/core/dataloader')


exports.create = async (req, res) => {
    // Save Prsteps in the database
    Prsteps.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prsteps."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('prsteps', req.query)
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

    Prsteps.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Prsteps with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Prsteps.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Prsteps was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prsteps with id=${id}. Maybe Prsteps was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prsteps with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Prsteps.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Prsteps was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Prsteps with id=${id}. Maybe Prsteps was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Prsteps with id=" + id
            });
        });
};
