const db = require("../models");
const Prstepsstatus = db.prstepsstatus;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Prstepsstatus in the database
    Prstepsstatus.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prstepsstatus."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('prstepsstatus', req.query)
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

    Prstepsstatus.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Prstepsstatus with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Prstepsstatus.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Prstepsstatus was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prstepsstatus with id=${id}. Maybe Prstepsstatus was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prstepsstatus with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Prstepsstatus.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Prstepsstatus was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Prstepsstatus with id=${id}. Maybe Prstepsstatus was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Prstepsstatus with id=" + id
            });
        });
};
