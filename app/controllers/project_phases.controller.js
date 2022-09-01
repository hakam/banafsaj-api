const db = require("../models");
const Projectphases = db.projectphases;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Projectphases in the database
    Projectphases.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Projectphases."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('projectphases', req.query)
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

    Projectphases.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Projectphases with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Projectphases.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Projectphases was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Projectphases with id=${id}. Maybe Projectphases was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Projectphases with id=" + id
            });
        });
};
exports.delete = async(req, res) => {
    const id = req.params.id;

    Projectphases.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Projectphases was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Projectphases with id=${id}. Maybe Projectphases was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Projectphases with id=" + id
            });
        });
};
