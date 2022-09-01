const db = require("../models");
const bTrip = db.bTrip;
const DataLoader = require('../config/core/dataloader')
const Notifications = db.notifications;


exports.create = (req, res) => {
    // Save bTrip in the database
    bTrip.create(req.body)
        .then(async data => {
            Notifications.create({
                employeeId: req.body.reportToId,
                message: "You Have New Trip Request",
                path:'dashboard',
                sender:req.user.employeeId
            })
            let room = 'room-' + req.body.reportToId
            req.io.sockets.in(room).emit('message', { content: "insert" });
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the bTrip."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('bTrip', req.query)
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

    bTrip.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving bTrip with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    bTrip.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "bTrip was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update bTrip with id=${id}. Maybe bTrip was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating bTrip with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    bTrip.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "bTrip was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete bTrip with id=${id}. Maybe bTrip was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete bTrip with id=" + id
            });
        });
};
