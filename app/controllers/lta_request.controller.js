const db = require("../models");
const ltaRequest = db.ltaRequest;
const DataLoader = require('../config/core/dataloader')
const lta_request_items = db.ltaRequest_request_items;
const Prstepsstatus = db.prstepsstatus;
var moment = require('moment');


exports.create = (req, res) => {
    // Save Purchaserequest in the database
    ltaRequest.create(req.body)
        .then(async data => {
            req.body.items.map(p=>{ p.ltaId = data.id ;return p})
            await lta_request_items.bulkCreate(req.body.items)  
           
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Purchaserequest."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('ltaRequest', req.query)
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
    const _id = req.params.id;
    
    ltaRequest.findOne({
        where: {id:_id},
        include: 
        [
            {
               model: lta_request_items, as: "items" 
            }
          ]   
         
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ltaRequest with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    ltaRequest.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "ltaRequest was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update ltaRequest with id=${id}. Maybe ltaRequest was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating ltaRequest with id=" + id
            });
        });
};
exports.updateStatus = async (req, res) => {
    const _id = req.params.id;
    let today = moment(new Date()).format("YYYY-MM-DD");
    const prData = await ltaRequest.findOne({where: {id:_id}})
    if(prData.statusId == 1 &&  req.body.statusId == 2 ){
        await Prstepsstatus.create({
            createdBy: req.user.id,
            updatedBy: req.user.id,
            prId : _id,
            stepId : 1,
            startdate : today,
        })
    }
    ltaRequest.update(req.body, {
        where: { id: _id }
    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "ltaRequest was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update ltaRequest with id=${_id}. Maybe ltaRequest was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating ltaRequest with id=" + _id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    ltaRequest.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "ltaRequest was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete ltaRequest with id=${id}. Maybe ltaRequest was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete ltaRequest with id=" + id
            });
        });
};
