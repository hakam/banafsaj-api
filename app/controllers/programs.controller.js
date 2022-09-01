const db = require("../models");
const Programs = db.programs;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Programs in the database
    Programs.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Programs."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('programs', req.query)
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

    Programs.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Programs with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Programs.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Programs was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Programs with id=${id}. Maybe Programs was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Programs with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Programs.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Programs was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Programs with id=${id}. Maybe Programs was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Programs with id=" + id
            });
        });
};
