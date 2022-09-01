const db = require("../models");
const Mediatasks = db.mediatasks;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Mediatasks in the database
    Mediatasks.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Mediatasks."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('mediatasks', req.query)
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

    Mediatasks.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Mediatasks with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Mediatasks.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Mediatasks was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Mediatasks with id=${id}. Maybe Mediatasks was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Mediatasks with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Mediatasks.findByPk(id)
    Mediatasks.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Mediatasks was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Mediatasks with id=${id}. Maybe Mediatasks was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Mediatasks with id=" + id
            });
        });
};
