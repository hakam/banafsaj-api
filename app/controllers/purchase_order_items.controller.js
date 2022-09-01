const db = require("../models");
const Purchase_order_items = db.purchase_order_items;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Purchase_order_items in the database
    Purchase_order_items.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Purchase_order_items."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('Purchase_order_items', req.query)
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

    Purchase_order_items.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Purchase_order_items with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Purchase_order_items.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Purchase_order_items was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Purchase_order_items with id=${id}. Maybe Purchase_order_items was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Purchase_order_items with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Purchase_order_items.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Purchase_order_items was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Purchase_order_items with id=${id}. Maybe Purchase_order_items was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Purchase_order_items with id=" + id
            });
        });
};
