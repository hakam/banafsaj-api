const db = require("../models");
const RbacEntityFunction = db.rbacEntityFunction;

const DataLoader = require('../config/core/dataloader')


exports.create = async (req, res) => {
    // Save RbacEntityFunction in the database
    RbacEntityFunction.create(req.body)
        .then(async data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the RbacEntityFunction."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('rbacEntityFunction', req.query)
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

    RbacEntityFunction.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RbacEntityFunction with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    RbacEntityFunction.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "RbacEntityFunction was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update RbacEntityFunction with id=${id}. Maybe RbacEntityFunction was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating RbacEntityFunction with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    RbacEntityFunction.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "RbacEntityFunction was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete RbacEntityFunction with id=${id}. Maybe RbacEntityFunction was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete RbacEntityFunction with id=" + id
            });
        });
};
