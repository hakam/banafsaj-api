const db = require("../models");
const Empcontract = db.empcontract;
const DataLoader = require('../config/core/dataloader')
var path = require("path");
const fs = require("fs");

exports.create = (req, res) => {
    // Save Empcontract in the database
    Empcontract.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Empcontract."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('empcontract', req.query)
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

    Empcontract.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Empcontract with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Empcontract.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Empcontract was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Empcontract with id=${id}. Maybe Empcontract was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Empcontract with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Empcontract.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Empcontract was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Empcontract with id=${id}. Maybe Empcontract was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Empcontract with id=" + id
            });
        });
};
exports.uploadDoc = async (req, res) => {

    console.log(req.body);
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
        let path = req.file.filename
        if (req.file.mimetype.startsWith("image")) {

            documentType = 'image'
        } else if (req.file.mimetype.startsWith("application/pdf")) {
            documentType = 'pdf'
        }
        Empcontract.update({path}, {
            where: { id: req.body.contractId },
            individualHooks: true
    
        })
            .then(data => {
                console.log(req.body);
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Empdocs."
                });
            });


    }

};
exports.getFile = (req, res) => {
    try {
        const fileName = req.params.id+'/'+req.params.name;

        if (fs.existsSync(path.join(__dirname, '../../public/contract/' + fileName))) {
            res.sendFile(path.join(__dirname, '../../public/contract/' + fileName));
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
