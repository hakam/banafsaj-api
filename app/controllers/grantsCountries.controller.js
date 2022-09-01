const db = require("../models");
const GrantsCountries = db.grantsCountries;

const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save GrantsCountries in the database
    GrantsCountries.create(req.body)
        .then(async data => {
      
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the GrantsCountries."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('grantsCountries', req.query)
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

    GrantsCountries.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving GrantsCountries with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    GrantsCountries.update(req.body, {
        where: { id: id }
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "GrantsCountries was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update GrantsCountries with id=${id}. Maybe GrantsCountries was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating GrantsCountries with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    const cid = req.params.cid;
    GrantsCountries.destroy({
        where: { grantId: id, countryId:cid},
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "GrantsCountries was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete GrantsCountries with id=${id}. Maybe GrantsCountries was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete GrantsCountries with id=" + id
            });
        });
};


