const db = require("../models");
const Pr_item_name = db.pr_item_name;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Pr_item_name in the database
    Pr_item_name.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pr_item_name."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('pr_item_name', req.query)
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

    Pr_item_name.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pr_item_name with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Pr_item_name.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Pr_item_name was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pr_item_name with id=${id}. Maybe Pr_item_name was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pr_item_name with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Pr_item_name.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Pr_item_name was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pr_item_name with id=${id}. Maybe Pr_item_name was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pr_item_name with id=" + id
            });
        });
};
