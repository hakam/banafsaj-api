const db = require("../models");
const Ememrgencycontact = db.ememrgencycontact;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Ememrgencycontact in the database
    Ememrgencycontact.create(req.body)
        .then(async data => {


            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Ememrgencycontact."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('ememrgencycontact', req.query)
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

    Ememrgencycontact.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ememrgencycontact with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Ememrgencycontact.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Ememrgencycontact was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Ememrgencycontact with id=${id}. Maybe Ememrgencycontact was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ememrgencycontact with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Ememrgencycontact.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Ememrgencycontact was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Ememrgencycontact with id=${id}. Maybe Ememrgencycontact was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ememrgencycontact with id=" + id
            });
        });
};
