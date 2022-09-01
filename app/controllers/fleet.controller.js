const db = require("../models");
const Fleet = db.fleet;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Fleet in the database
    Fleet.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Fleet."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('fleet', req.query)
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

    Fleet.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Fleet with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Fleet.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Fleet was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Fleet with id=${id}. Maybe Fleet was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Fleet with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Fleet.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Fleet was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Fleet with id=${id}. Maybe Fleet was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Fleet with id=" + id
            });
        });
};
