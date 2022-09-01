const db = require("../models");
const Requestforquotation = db.requestforquotation;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Requestforquotation in the database
    Requestforquotation.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Requestforquotation."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('requestforquotation', req.query)
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

    Requestforquotation.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Requestforquotation with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Requestforquotation.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Requestforquotation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Requestforquotation with id=${id}. Maybe Requestforquotation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Requestforquotation with id=" + id
            });
        });
};
exports.delete = async(req, res) => {
    const id = req.params.id;
    let oldData = await Requestforquotation.findByPk(id)

    Requestforquotation.destroy({
        where: { id: id }
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Requestforquotation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Requestforquotation with id=${id}. Maybe Requestforquotation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Requestforquotation with id=" + id
            });
        });
};
