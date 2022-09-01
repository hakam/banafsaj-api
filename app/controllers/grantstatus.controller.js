const db = require("../models");
const Grantstatus = db.grantstatus;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Grantstatus in the database
    Grantstatus.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Grantstatus."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        
        const dataLoader = new DataLoader('grantstatus', req.query)
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

    Grantstatus.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Grantstatus with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Grantstatus.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Grantstatus was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Grantstatus with id=${id}. Maybe Grantstatus was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Grantstatus with id=" + id
            });
        });
};
exports.delete = async(req, res) => {
    const id = req.params.id;

    Grantstatus.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Grantstatus was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Grantstatus with id=${id}. Maybe Grantstatus was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Grantstatus with id=" + id
            });
        });
};
