const db = require("../models");
const Practivity = db.practivity;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Practivity in the database
    Practivity.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Practivity."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('practivity', req.query)
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

    Practivity.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Practivity with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Practivity.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Practivity was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Practivity with id=${id}. Maybe Practivity was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Practivity with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Practivity.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Practivity was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Practivity with id=${id}. Maybe Practivity was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Practivity with id=" + id
            });
        });
};
