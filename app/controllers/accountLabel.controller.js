const db = require("../models");
const AccountLabel = db.accountLabel;

const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    console.log(req.body);
    AccountLabel.create(req.body)
        .then(async data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AccountLabel."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('accountLabel', req.query)
        const result = await dataLoader.load()
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactions."
        });
    }


};
exports.findOne = (req, res) => {
    const id = req.params.id;

    AccountLabel.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving AccountLabel with id=" + id
            });
        });
};
exports.update = (req, res) => {
    console.log(req.body);
    const id = req.params.id;

    AccountLabel.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then( num => {
            console.log(JSON.stringify(num));
            if (num[0] == 1) {
                res.send({
                    message: "AccountLabel was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update AccountLabel with id=${id}. Maybe AccountLabel was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating AccountLabel with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    AccountLabel.destroy({
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {
            if (num[0] == 1) {
                
                res.send({
                    message: "AccountLabel was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete AccountLabel with id=${id}. Maybe AccountLabel was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete AccountLabel with id=" + id
            });
        });
};
