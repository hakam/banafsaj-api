const db = require("../models");
const Committee = db.committee;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Committee in the database
    Committee.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Committee."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('committee', req.query)
        const result = await dataLoader.load()
        for (let p = 0; p < result.data.length; p++) {
            const element = result.data[p];
            const items = element.CommitteeIds.split(',').map(Number);
            element.CommitteeIds = items
        }
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

    Committee.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Committee with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Committee.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Committee was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Committee with id=${id}. Maybe Committee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Committee with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Committee.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {
                res.send({
                    message: "Committee was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Committee with id=${id}. Maybe Committee was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Committee with id=" + id
            });
        });
};
