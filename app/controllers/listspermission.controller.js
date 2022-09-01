const db = require("../models");
const listspermission = db.listspermission;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save listspermission in the database
    listspermission.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the listspermission."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('listspermission', req.query)
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

    listspermission.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving listspermission with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    listspermission.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "listspermission was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update listspermission with id=${id}. Maybe listspermission was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating listspermission with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    listspermission.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "listspermission was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete listspermission with id=${id}. Maybe listspermission was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete listspermission with id=" + id
            });
        });
};
