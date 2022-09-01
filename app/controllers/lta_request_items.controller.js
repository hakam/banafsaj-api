const db = require("../models");
const lta_request_items = db.lta_request_items;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Purchase_request_items in the database
    lta_request_items.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Purchase_request_items."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('lta_request_items', req.query)
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

    lta_request_items.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving lta_request_items with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    lta_request_items.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "lta_request_items was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update lta_request_items with id=${id}. Maybe lta_request_items was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating lta_request_items with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    lta_request_items.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "lta_request_items was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete lta_request_items with id=${id}. Maybe Purchase_request_items was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete lta_request_items with id=" + id
            });
        });
};
