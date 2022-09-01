const db = require("../models");
const Granttimeline = db.granttimeline;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Granttimeline in the database
    Granttimeline.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Granttimeline."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('granttimeline', req.query)
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

    Granttimeline.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Granttimeline with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Granttimeline.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Granttimeline was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Granttimeline with id=${id}. Maybe Granttimeline was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Granttimeline with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Granttimeline.findByPk(id)

    Granttimeline.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Granttimeline was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Granttimeline with id=${id}. Maybe Granttimeline was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Granttimeline with id=" + id
            });
        });
};
