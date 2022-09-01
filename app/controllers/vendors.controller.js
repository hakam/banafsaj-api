const db = require("../models");
const Vendors = db.vendors;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Vendors in the database
    Vendors.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vendors."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('vendors', req.query)
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

    Vendors.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vendors with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Vendors.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Vendors was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vendors with id=${id}. Maybe Vendors was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vendors with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Vendors.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Vendors was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Vendors with id=${id}. Maybe Vendors was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Vendors with id=" + id
            });
        });
};
