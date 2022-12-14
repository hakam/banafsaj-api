const db = require("../models");
const lists = db.lists;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save lists in the database
    lists.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the lists."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('lists', req.query)
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

    lists.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving lists with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    lists.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "lists was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update lists with id=${id}. Maybe lists was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating lists with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    lists.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "lists was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete lists with id=${id}. Maybe lists was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete lists with id=" + id
            });
        });
};
