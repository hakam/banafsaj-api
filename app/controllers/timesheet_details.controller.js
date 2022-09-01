const db = require("../models");
const Timesheet_details = db.timesheet_details;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Timesheet_details in the database
    Timesheet_details.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Timesheet_details."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('timesheet_details', req.query)
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

    Timesheet_details.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Timesheet_details with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Timesheet_details.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Timesheet_details was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Timesheet_details with id=${id}. Maybe Timesheet_details was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Timesheet_details with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Timesheet_details.findByPk(id)
    Timesheet_details.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Timesheet_details was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Timesheet_details with id=${id}. Maybe Timesheet_details was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Timesheet_details with id=" + id
            });
        });
};
