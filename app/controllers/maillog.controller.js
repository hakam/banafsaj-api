const db = require("../models");
const Maillog = db.maillog;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Maillog in the database
    Maillog.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Maillog."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('maillog', req.query)
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

    Maillog.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Maillog with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Maillog.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Maillog was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Maillog with id=${id}. Maybe Maillog was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Maillog with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Maillog.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Maillog was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Maillog with id=${id}. Maybe Maillog was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Maillog with id=" + id
            });
        });
};
