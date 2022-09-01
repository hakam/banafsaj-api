const db = require("../models");
const Assettype = db.assettype;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Assettype in the database
    Assettype.create(req.body)
        .then( async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Assettype."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('assettype', req.query)
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

    Assettype.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Assettype with id=" + id
            });
        });
};
exports.update = async (req, res) => {
    const id = req.params.id;

    Assettype.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Assettype was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Assettype with id=${id}. Maybe Assettype was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Assettype with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Assettype.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Assettype was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Assettype with id=${id}. Maybe Assettype was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Assettype with id=" + id
            });
        });
};
