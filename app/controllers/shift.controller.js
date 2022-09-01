const db = require("../models");
const Shift = db.shift;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Shift in the database
    Shift.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Shift."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('shift', req.query)
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

    Shift.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Shift with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Shift.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Shift was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Shift with id=${id}. Maybe Shift was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Shift with id=" + id
            });
        });
};
exports.delete = async(req, res) => {
    const id = req.params.id;
    let oldData = await Shift.findByPk(id)

    Shift.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Shift was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Shift with id=${id}. Maybe Shift was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Shift with id=" + id
            });
        });
};
