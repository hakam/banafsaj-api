const db = require("../models");
const Donor = db.donor;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Donor in the database
    Donor.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Donor."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('donor', req.query)
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

    Donor.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Donor with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Donor.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Donor was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Donor with id=${id}. Maybe Donor was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Donor with id=" + id
            });
        });
};
exports.delete =  async (req, res) => {
    const id = req.params.id;

    Donor.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Donor was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Donor with id=${id}. Maybe Donor was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Donor with id=" + id
            });
        });
};
