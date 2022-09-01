const db = require("../models");
const Projectactivity = db.projectactivity;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Projectactivity in the database
    Projectactivity.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Projectactivity."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('projectactivity', req.query)
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

    Projectactivity.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Projectactivity with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Projectactivity.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Projectactivity was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Projectactivity with id=${id}. Maybe Projectactivity was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Projectactivity with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Projectactivity.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Projectactivity was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Projectactivity with id=${id}. Maybe Projectactivity was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Projectactivity with id=" + id
            });
        });
};
