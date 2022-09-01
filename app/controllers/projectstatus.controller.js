const db = require("../models");
const Projectstatus = db.projectstatus;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Projectstatus in the database
    Projectstatus.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Projectstatus."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('projectstatus', req.query)
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

    Projectstatus.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Projectstatus with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Projectstatus.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Projectstatus was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Projectstatus with id=${id}. Maybe Projectstatus was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Projectstatus with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Projectstatus.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Projectstatus was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Projectstatus with id=${id}. Maybe Projectstatus was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Projectstatus with id=" + id
            });
        });
};
