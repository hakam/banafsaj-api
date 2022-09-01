const db = require("../models");
const Designation = db.designation;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Designation in the database
    Designation.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Designation."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('designation', req.query)
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

    Designation.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Designation with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Designation.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Designation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Designation with id=${id}. Maybe Designation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Designation with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Designation.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Designation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Designation with id=${id}. Maybe Designation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Designation with id=" + id
            });
        });
};
