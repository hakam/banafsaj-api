const db = require("../models");
const Servicescompletionnote = db.servicescompletionnote;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Servicescompletionnote in the database
    Servicescompletionnote.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Servicescompletionnote."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('servicescompletionnote', req.query)
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

    Servicescompletionnote.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Servicescompletionnote with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Servicescompletionnote.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Servicescompletionnote was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Servicescompletionnote with id=${id}. Maybe Servicescompletionnote was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Servicescompletionnote with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Servicescompletionnote.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Servicescompletionnote was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Servicescompletionnote with id=${id}. Maybe Servicescompletionnote was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Servicescompletionnote with id=" + id
            });
        });
};
