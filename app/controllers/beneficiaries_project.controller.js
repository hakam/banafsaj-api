const db = require("../models");
const Beneficiariesproject = db.beneficiariesproject;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Beneficiariesproject in the database
    Beneficiariesproject.create(req.body)
        .then( async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Beneficiariesproject."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('beneficiariesproject', req.query)
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

    Beneficiariesproject.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Beneficiariesproject with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Beneficiariesproject.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then( async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Beneficiariesproject was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Beneficiariesproject with id=${id}. Maybe Beneficiariesproject was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Beneficiariesproject with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Beneficiariesproject.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Beneficiariesproject was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Beneficiariesproject with id=${id}. Maybe Beneficiariesproject was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Beneficiariesproject with id=" + id
            });
        });
};
