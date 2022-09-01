const db = require("../models");
const LeaveReport = db.leaveReport;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save LeaveReport in the database
    LeaveReport.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the LeaveReport."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('leaveReport', req.query)
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

    LeaveReport.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving LeaveReport with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    LeaveReport.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "LeaveReport was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update LeaveReport with id=${id}. Maybe LeaveReport was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating LeaveReport with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    LeaveReport.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "LeaveReport was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete LeaveReport with id=${id}. Maybe LeaveReport was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete LeaveReport with id=" + id
            });
        });
};
