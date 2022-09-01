const db = require("../models");
const News = db.news;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save News in the database
    News.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the News."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('news', req.query)
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

    News.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving News with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    News.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "News was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating News with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await News.findByPk(id)

    News.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "News was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete News with id=${id}. Maybe News was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete News with id=" + id
            });
        });
};
