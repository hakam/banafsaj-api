const db = require("../models");
const Proeshd = db.proeshd;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Proeshd in the database
    Proeshd.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Proeshd."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('proeshd', req.query)
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

    Proeshd.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Proeshd with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Proeshd.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Proeshd was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Proeshd with id=${id}. Maybe Proeshd was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Proeshd with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    

    Proeshd.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Proeshd was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Proeshd with id=${id}. Maybe Proeshd was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Proeshd with id=" + id
            });
        });
};
