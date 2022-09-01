const db = require("../models");
const Lta_contract_item = db.lta_contract_item;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Lta_contract_item in the database
    Lta_contract_item.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Lta_contract_item."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('lta_contract_item', req.query)
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

    Lta_contract_item.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Lta_contract_item with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Lta_contract_item.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Lta_contract_item was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Lta_contract_item with id=${id}. Maybe Lta_contract_item was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Lta_contract_item with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Lta_contract_item.findByPk(id)
    Lta_contract_item.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Lta_contract_item was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Lta_contract_item with id=${id}. Maybe Lta_contract_item was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Lta_contract_item with id=" + id
            });
        });
};
