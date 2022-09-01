const db = require("../models");
const Goodreceviednote = db.goodreceviednote;
const DataLoader = require('../config/core/dataloader')
const Asset = db.asset;
var moment = require('moment');


exports.create = (req, res) => {
    // Save Goodreceviednote in the database
    Goodreceviednote.bulkCreate(req.body)
        .then(async data => {

            let today = moment(new Date()).format("YYYY-MM-DD");
           for(let i = 0 ; i < data.length ; i++){
               let item = data[i]
               for(let p = 0 ; p < item.quantityr ; p++)
             Asset.create({
                createdBy: req.user.id,
	            updatedBy: req.user.id,
		        groupId : item.groupId,
                assetType : item.assetType,
                description :item.description,
                dateOfpurchase :today,
                vendorId :item.vendorId,
                })
             
        }
        res.send(data); 
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Goodreceviednote."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('goodreceviednote', req.query)
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

    Goodreceviednote.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Goodreceviednote with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Goodreceviednote.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Goodreceviednote was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Goodreceviednote with id=${id}. Maybe Goodreceviednote was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Goodreceviednote with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Goodreceviednote.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Goodreceviednote was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Goodreceviednote with id=${id}. Maybe Goodreceviednote was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Goodreceviednote with id=" + id
            });
        });
};
