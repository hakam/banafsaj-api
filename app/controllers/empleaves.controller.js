const db = require("../models");
const Empleaves = db.empleaves;
const DataLoader = require('../config/core/dataloader')
const Notifications = db.notifications;
var path = require("path");
const fs = require("fs");

exports.create = (req, res) => {
    // Save Empleaves in the database
    let path = ''
    if(req.file){
         path = req.file.filename
    }
   
    let allData = {}
    if(path){
        const file = { attachment: path };
        allData = Object.assign(req.body, file);
    }else{
        allData = req.body
    }
    
    // const allData = Object.assign(req.body, pass);
    Empleaves.create(allData)
        .then(async data => {
            Notifications.create({
                employeeId : req.body.reportTo,
                message : "You Have New Leave Request",
                path:'dashboard',
                sender:req.user.employeeId
                })
                let room = 'room-'+req.body.reportTo
                req.io.sockets.in(room).emit('message', { content: "insert" });
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Empleaves."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('empleaves', req.query)
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

    Empleaves.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Empleaves with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Empleaves.update(req.body, {
        where: { id: id },

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Empleaves was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Empleaves with id=${id}. Maybe Empleaves was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Empleaves with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Empleaves.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Empleaves was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Empleaves with id=${id}. Maybe Empleaves was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Empleaves with id=" + id
            });
        });
};
exports.getFile = (req, res) => {
    try {
        const fileName = req.params.folder+'/'+req.params.id+'/'+req.params.name;

        if (fs.existsSync(path.join(__dirname, '../../public/' + fileName))) {
            res.sendFile(path.join(__dirname, '../../public/' + fileName));
        } else {
            res.send({
                message: "Could not find File"
            });
        }


    } catch (error) {
        res.status(500).send({
            message: "Could not find "+error
        });
    }

}
