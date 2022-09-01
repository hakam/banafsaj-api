const db = require("../models");
const Service_contract = db.service_contract;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Service_contract in the database
    Service_contract.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Service_contract."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('service contract', req.query)
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

    Service_contract.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Service_contract with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Service_contract.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Service_contract was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Service_contract with id=${id}. Maybe Service_contract was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Service_contract with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Service_contract.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Service_contract was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Service_contract with id=${id}. Maybe Service_contract was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Service_contract with id=" + id
            });
        });
};
