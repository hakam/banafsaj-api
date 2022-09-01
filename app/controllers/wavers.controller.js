const db = require("../models");
const Wavers = db.wavers;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Wavers in the database
    Wavers.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Wavers."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('wavers', req.query)
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

    Wavers.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Wavers with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Wavers.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Wavers was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Wavers with id=${id}. Maybe Wavers was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Wavers with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Wavers.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Wavers was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Wavers with id=${id}. Maybe Wavers was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Wavers with id=" + id
            });
        });
};
