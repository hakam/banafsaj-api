const db = require("../models");
const Registerdocs = db.registerdocs;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Registerdocs in the database
    Registerdocs.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Registerdocs."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('registerdocs', req.query)
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

    Registerdocs.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Registerdocs with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Registerdocs.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Registerdocs was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Registerdocs with id=${id}. Maybe Registerdocs was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Registerdocs with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Registerdocs.findByPk(id)
    Registerdocs.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Registerdocs was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Registerdocs with id=${id}. Maybe Registerdocs was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Registerdocs with id=" + id
            });
        });
};
