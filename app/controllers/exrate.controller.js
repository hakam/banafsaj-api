const db = require("../models");
const Exrate = db.exrate;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Exrate in the database
   
    Exrate.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Exrate."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('exrate', req.query)
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

    Exrate.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Exrate with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Exrate.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Exrate was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Exrate with id=${id}. Maybe Exrate was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Exrate with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Exrate.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Exrate was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Exrate with id=${id}. Maybe Exrate was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Exrate with id=" + id
            });
        });
};
