const db = require("../models");
const Currency = db.currency;

const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Currency in the database
    Currency.create(req.body)
        .then(async data => {
    
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Currency."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('currency', req.query)
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

    Currency.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Currency with id=" + id
            });
        });
};
exports.update = async (req, res) => {
    const id = req.params.id;

    Currency.update(req.body, {
        where: { id: id },
        individualHooks: true

           })
        .then(async num => {
            if (num[0] == 1) {
                
                    
                res.send({
                    message: "Currency was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot delete Currency with id=${id}. Maybe Currency was not found!`
                });

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Currency with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Currency.destroy({
        where: { id: id },
        individualHooks: true

        
    }
    )
        .then(async num => {
            if (num[0] == 1) {
                
                res.send({
                    message: "Currency was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Currency with id=${id}. Maybe Currency was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Currency with id=" + id
            });
        });
};
