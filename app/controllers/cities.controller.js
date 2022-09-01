const db = require("../models");
const Cities = db.cities;
const DataLoader = require('../config/core/dataloader')
const Auditlog = db.auditlog;


exports.create = (req, res) => {
    // Save Cities in the database
    Cities.create(req.body)
        .then(async data => {
           
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cities."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('cities', req.query)
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

    Cities.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Cities with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Cities.update(req.body, {
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {
          if (num[0] == 1) {
                res.send({
                    message: "Cities was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Cities with id=${id}. Maybe Cities was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Cities with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Cities.findByPk(id)
    Cities.destroy({
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {
           
            if (num[0] == 1) {
                res.send({
                    message: "Cities was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Cities with id=${id}. Maybe Cities was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Cities with id=" + id
            });
        });
};
