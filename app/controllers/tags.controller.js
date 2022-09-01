const db = require("../models");
const Tags = db.tags;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Tags in the database
    Tags.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tags."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('tags', req.query)
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

    Tags.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tags with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Tags.update(req.body, {
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Tags was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tags with id=${id}. Maybe Tags was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tags with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Tags.findByPk(id)

    Tags.destroy({
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Tags was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tags with id=${id}. Maybe Tags was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tags with id=" + id
            });
        });
};
