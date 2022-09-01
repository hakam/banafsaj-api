const db = require("../models");
const Pr_evaluation = db.pr_evaluation;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Pr_evaluation in the database
    Pr_evaluation.bulkCreate(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pr_evaluation."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('pr_evaluation', req.query)
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

    Pr_evaluation.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pr_evaluation with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Pr_evaluation.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Pr_evaluation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pr_evaluation with id=${id}. Maybe Pr_evaluation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pr_evaluation with id=" + id
            });
        });
};
exports.delete = async(req, res) => {
    const id = req.params.id;

    Pr_evaluation.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Pr_evaluation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pr_evaluation with id=${id}. Maybe Pr_evaluation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pr_evaluation with id=" + id
            });
        });
};
