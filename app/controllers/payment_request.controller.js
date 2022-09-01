const db = require("../models");
const Paymentrequest = db.paymentrequest;
const DataLoader = require('../config/core/dataloader')
const Prsteps = db.prsteps
const PrsSteps = db.prsSteps

exports.create = (req, res) => {
    // Save Paymentrequest in the database





    Paymentrequest.create(req.body)
        .then(async data => {

            switch (req.body.prTypeId) {
                case 1:
                    if(req.body.advancePayment == true){
                        const prStep = await Prsteps.findAll({
                            where: {
                                block: 'Block Advance Payment'
                            },
                            attributes: { exclude: ['id'] }
                        });
                        for (let i = 0; i < prStep.length; i++) {
                            let step = prStep[i]
                            await PrsSteps.create({
                                createdBy: req.body.createdBy,
                                updatedBy: req.body.updatedBy,
                                description: step.description,
                                name: step.name,
                                prId: req.body.prId,
                                roleId: step.roleId,
                                period: step.period,
                                sortOrder: step.sortOrder,
                                departmentId: step.departmentId,
                                hasNext: step.hasNext,
                                viewType:  step.viewType
                            })
                        } 
                    }else{
                        const prStep = await Prsteps.findAll({
                            where: {
                                block: 'Block Goods Payment'
                            },
                            attributes: { exclude: ['id'] }
                        });
                        for (let i = 0; i < prStep.length; i++) {
                            let step = prStep[i]
                            await PrsSteps.create({
                                createdBy: req.body.createdBy,
                                updatedBy: req.body.updatedBy,
                                description: step.description,
                                name: step.name,
                                prId:req.body.prId,
                                roleId: step.roleId,
                                period: step.period,
                                sortOrder: step.sortOrder,
                                departmentId: step.departmentId,
                                hasNext: step.hasNext,
                                viewType:  step.viewType
                            })
                        }
                        if(req.body.isLastPayment == true){
                            const prStep = await Prsteps.findAll({
                                where: {
                                    block: 'PR Last'
                                },
                                attributes: { exclude: ['id'] }
                            });
                            for (let i = 0; i < prStep.length; i++) {
                                let step = prStep[i]
                                await PrsSteps.create({
                                    createdBy: req.body.createdBy,
                                    updatedBy: req.body.updatedBy,
                                    description: step.description,
                                    name: step.name,
                                    prId:req.body.prId,
                                    roleId: step.roleId,
                                    period: step.period,
                                    sortOrder: step.sortOrder,
                                    departmentId: step.departmentId,
                                    hasNext: step.hasNext,
                                    viewType:  step.viewType
                                })
                            }
                        }
                    }
                    
                    break;
                case 2:
                    if(req.body.advancePayment == true){
                        const prStep = await Prsteps.findAll({
                            where: {
                                block: 'Block Advance Payment'
                            },
                            attributes: { exclude: ['id'] }
                        }); 
                        for (let i = 0; i < prStep.length; i++) {
                            let step = prStep[i]
                            await PrsSteps.create({
                                createdBy: req.body.createdBy,
                                updatedBy: req.body.updatedBy,
                                description: step.description,
                                name: step.name,
                                prId:req.body.prId,
                                roleId: step.roleId,
                                period: step.period,
                                sortOrder: step.sortOrder,
                                departmentId: step.departmentId,
                                hasNext: step.hasNext,
                                viewType:  step.viewType
                            })
                        }
                    }else{
                        const prStep = await Prsteps.findAll({
                            where: {
                                block: 'Block service Payment'
                            },
                            attributes: { exclude: ['id'] }
                        });
                        for (let i = 0; i < prStep.length; i++) {
                            let step = prStep[i]
                            await PrsSteps.create({
                                createdBy: req.body.createdBy,
                                updatedBy: req.body.updatedBy,
                                description: step.description,
                                name: step.name,
                                prId: req.body.prId,
                                roleId: step.roleId,
                                period: step.period,
                                sortOrder: step.sortOrder,
                                departmentId: step.departmentId,
                                hasNext: step.hasNext,
                                viewType:  step.viewType
                            })
                        }
                        if(req.body.isLastPayment == true){
                            const prStep = await Prsteps.findAll({
                                where: {
                                    block: 'PR Last'
                                },
                                attributes: { exclude: ['id'] }
                            });
                            for (let i = 0; i < prStep.length; i++) {
                                let step = prStep[i]
                                await PrsSteps.create({
                                    createdBy: req.body.createdBy,
                                    updatedBy: req.body.updatedBy,
                                    description: step.description,
                                    name: step.name,
                                    prId:req.body.prId,
                                    roleId: step.roleId,
                                    period: step.period,
                                    sortOrder: step.sortOrder,
                                    departmentId: step.departmentId,
                                    hasNext: step.hasNext,
                                    viewType:  step.viewType
                                })
                            }
                        }
                    }
                    break;
                   
            
             
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Paymentrequest."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('paymentrequest', req.query)
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

    Paymentrequest.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Paymentrequest with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Paymentrequest.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Paymentrequest was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Paymentrequest with id=${id}. Maybe Paymentrequest was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Paymentrequest with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Paymentrequest.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Paymentrequest was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Paymentrequest with id=${id}. Maybe Paymentrequest was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Paymentrequest with id=" + id
            });
        });
};
