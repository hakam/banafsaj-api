const db = require("../models");
const Recruitment = db.recruitment;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Recruitment in the database
    Recruitment.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Recruitment."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('recruitment', req.query)
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

    Recruitment.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Recruitment with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Recruitment.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Recruitment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Recruitment with id=${id}. Maybe Recruitment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Recruitment with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Recruitment.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Recruitment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Recruitment with id=${id}. Maybe Recruitment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Recruitment with id=" + id
            });
        });
};
