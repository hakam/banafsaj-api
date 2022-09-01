const db = require("../models");
const LeaveBalance = db.leaveBalance;
const DataLoader = require('../config/core/dataloader')
const Auditlog = db.auditlog;


exports.create = (req, res) => {
    // Save LeaveBalance in the database
    LeaveBalance.create(req.body)
        .then(async data => {
           
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the LeaveBalance."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('leaveBalance', req.query)
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

    LeaveBalance.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving LeaveBalance with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    LeaveBalance.update(req.body, {
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {
          if (num[0] == 1) {
                res.send({
                    message: "LeaveBalance was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update LeaveBalance with id=${id}. Maybe LeaveBalance was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating LeaveBalance with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await LeaveBalance.findByPk(id)
    LeaveBalance.destroy({
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {
           
            if (num[0] == 1) {
                res.send({
                    message: "LeaveBalance was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete LeaveBalance with id=${id}. Maybe LeaveBalance was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete LeaveBalance with id=" + id
            });
        });
};
