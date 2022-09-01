const db = require("../models");
const Purchaseorder = db.purchaseorder;
const DataLoader = require('../config/core/dataloader')
const Purchase_order_items = db.purchase_order_items;



exports.create = (req, res) => {
    // Save Purchaseorder in the database
    Purchaseorder.create(req.body)
        .then(async data => {
            req.body.items.map(p=>{ p.purchaseorderId = data.id ;return p})
            await Purchase_order_items.bulkCreate(req.body.items)  
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Purchaseorder."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('purchaseorder', req.query)
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
    
    Purchaseorder.findOne({
        where: {id:_id},
        include: 
        [
            {
               model: Purchase_order_items, as: "items" 
            }
          ]   
         
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Purchaserequest with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Purchaseorder.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Purchaseorder was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Purchaseorder with id=${id}. Maybe Purchaseorder was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Purchaseorder with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    let oldData = await Purchaseorder.findByPk(id)

    Purchaseorder.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Purchaseorder was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Purchaseorder with id=${id}. Maybe Purchaseorder was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Purchaseorder with id=" + id
            });
        });
};
