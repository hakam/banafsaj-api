const db = require("../models");
const Prpricelevel = db.prpricelevel;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Prpricelevel in the database
    Prpricelevel.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prpricelevel."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('prpricelevel', req.query)
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

    Prpricelevel.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Prpricelevel with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Prpricelevel.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Prpricelevel was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Prpricelevel with id=${id}. Maybe Prpricelevel was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Prpricelevel with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Prpricelevel.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Prpricelevel was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Prpricelevel with id=${id}. Maybe Prpricelevel was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Prpricelevel with id=" + id
            });
        });
};
