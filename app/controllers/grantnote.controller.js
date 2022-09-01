const db = require("../models");
const Grantnote = db.grantnote;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Grantnote in the database
    Grantnote.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Grantnote."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('grantnote', req.query)
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

    Grantnote.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Grantnote with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Grantnote.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Grantnote was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Grantnote with id=${id}. Maybe Grantnote was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Grantnote with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Grantnote.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Grantnote was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Grantnote with id=${id}. Maybe Grantnote was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Grantnote with id=" + id
            });
        });
};
