const db = require("../models");
const Notifications = db.notifications;

const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    console.log(req.body);
  

    Notifications.create(req.body)
        .then(async data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Notifications."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('notifications', req.query)
        const result = await dataLoader.load()
        var clients = req.io.sockets;
       // req.io.to.emit('room-88', { content: "yalooooooooooooooooooooooooooooooooooooooo" });
     ;
        let rooms =    req.io.sockets.adapter.rooms

        console.log(rooms);
        clients.sockets.forEach(function (data, counter) {

           // console.log(data);//maps

            var socketid = data.id;//log ids
            var isConnected = data.connected//true,false;
            console.log(socketid, isConnected);
        });
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactions."
        });
    }


};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Notifications.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Notifications with id=" + id
            });
        });
};
exports.update = (req, res) => {
    console.log(req.body);
    const id = req.params.id;

    Notifications.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            console.log(JSON.stringify(num));
            if (num[0] == 1) {
                res.send({
                    message: "Notifications was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Notifications with id=${id}. Maybe Notifications was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Notifications with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Notifications.destroy({
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Notifications was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Notifications with id=${id}. Maybe Notifications was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Notifications with id=" + id
            });
        });
};

exports.sendNotifications = async (req, res) => {
    try {
        
        
    } catch (error) {
        
    }
}