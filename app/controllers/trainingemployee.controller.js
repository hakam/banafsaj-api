const db = require("../models");
const Trainingemployee = db.trainingemployee;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Trainingemployee in the database
    Trainingemployee.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Trainingemployee."
            });
        });
};
exports.findAll = async (req, res) => {
  
    try {
        const dataLoader = new DataLoader('trainingemployee', req.query)
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

    Trainingemployee.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Trainingemployee with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Trainingemployee.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Trainingemployee was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Trainingemployee with id=${id}. Maybe Trainingemployee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Trainingemployee with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Trainingemployee.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Trainingemployee was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Trainingemployee with id=${id}. Maybe Trainingemployee was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Trainingemployee with id=" + id
            });
        });
};
