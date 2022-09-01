const db = require("../models");
const Prqoutations = db.prqoutations;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Prqoutations in the database
    Prqoutations.bulkCreate(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prqoutations."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('prqoutations', req.query)
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

    Prqoutations.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Prqoutations with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Prqoutations.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Prqoutations was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prqoutations with id=${id}. Maybe Prqoutations was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prqoutations with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Prqoutations.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Prqoutations was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Prqoutations with id=${id}. Maybe Prqoutations was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Prqoutations with id=" + id
            });
        });
};
