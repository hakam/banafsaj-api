const db = require("../models");
const Dashboards = db.dashboards;
const DataLoader = require('../config/core/dataloader')



exports.create = (req, res) => {
    // Save Dashboards in the database
    Dashboards.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Dashboards."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('dashboards', req.query)
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

    Dashboards.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Dashboards with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Dashboards.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Dashboards was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Dashboards with id=${id}. Maybe Dashboards was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Dashboards with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Dashboards.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Dashboards was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Dashboards with id=${id}. Maybe Dashboards was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Dashboards with id=" + id
            });
        });
};
