const db = require("../models");
const Procurementplan = db.procurementplan;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Procurementplan in the database
    Procurementplan.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Procurementplan."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('procurementplan', req.query)
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

    Procurementplan.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Procurementplan with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Procurementplan.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Procurementplan was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Procurementplan with id=${id}. Maybe Procurementplan was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Procurementplan with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Procurementplan.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Procurementplan was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Procurementplan with id=${id}. Maybe Procurementplan was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Procurementplan with id=" + id
            });
        });
};
