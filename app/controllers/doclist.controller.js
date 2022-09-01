const db = require("../models");
const Doclist = db.doclist;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Doclist in the database
    Doclist.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Doclist."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('doclist', req.query)
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

    Doclist.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Doclist with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Doclist.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Doclist was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Doclist with id=${id}. Maybe Doclist was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Doclist with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Doclist.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Doclist was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Doclist with id=${id}. Maybe Doclist was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Doclist with id=" + id
            });
        });
};

