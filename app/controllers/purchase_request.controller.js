const db = require("../models");
const Purchaserequest = db.purchaserequest;
const DataLoader = require('../config/core/dataloader')
const Purchase_request_items = db.purchase_request_items;
const Prstepsstatus = db.prstepsstatus;
const Prsteps = db.prsteps
const PrsSteps = db.prsSteps
var moment = require('moment');


exports.create = (req, res) => {
    // Save Purchaserequest in the database
    Purchaserequest.create(req.body)
        .then(async data => {
            req.body.items.map(p => { p.purchaserequestId = data.id; return p })
            await Purchase_request_items.bulkCreate(req.body.items)
            const prStep = await Prsteps.findAll({
                where: {
                    prTypeId: req.body.prTypeId,
                    stepType: 'Start'
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
                    prId: data.id,
                    roleId: step.roleId,
                    period: step.period,
                    sortOrder: step.sortOrder,
                    departmentId: step.departmentId,
                    hasNext: step.hasNext,
                    viewType:  step.viewType
                })
            }

            // await PrsSteps.bulkCreate(prStep)
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
        const dataLoader = new DataLoader('purchaserequest', req.query)
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

    Purchaserequest.findOne({
        where: { id: _id },
        include:
            [
                {
                    model: Purchase_request_items, as: "items"
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

    Purchaserequest.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Purchaserequest was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Purchaserequest with id=${id}. Maybe Purchaserequest was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Purchaserequest with id=" + id
            });
        });
};
exports.updateStatus = async (req, res) => {
    const _id = req.params.id;

    let today = moment(new Date()).format("YYYY-MM-DD");
    const prData = await Purchaserequest.findOne({ where: { id: _id } })
    if (prData.statusId == 1 && req.body.statusId == 2) {

        const PrsStepsData = await PrsSteps.findAll({
            where: {
                prId: _id
            },
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['id', 'ASC']]
            , limit: 1
        });

        await Purchaserequest.update({ statusId: 2, stepId: PrsStepsData[0].id, prDepartmentId: PrsStepsData[0].prDepartmentId }, {
            where: {
                id: _id
            }
        });
        await Prstepsstatus.create({
            createdBy: req.user.id,
            updatedBy: req.user.id,
            prId: _id,
            stepId: PrsStepsData[0].id,
            startdate: today,
        })
        res.send({
            message: "Purchaserequest was updated successfully."
        });
    } else {
        Purchaserequest.update(req.body, {
            where: { id: _id }
        })
            .then(num => {
                if (num[0] == 1) {
                    res.send({
                        message: "Purchaserequest was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Purchaserequest with id=${_id}. Maybe Purchaserequest was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Purchaserequest with id=" + _id
                });
            });
    }


};
exports.delete = (req, res) => {
    const id = req.params.id;
    Purchaserequest.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Purchaserequest was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Purchaserequest with id=${id}. Maybe Purchaserequest was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Purchaserequest with id=" + id
            });
        });
};

exports.movePr = async (req, res) => {

    try {
        const customData = await db.sequelize.transaction(async (t) => {

            
           let today = moment(new Date()).format("YYYY-MM-DD");
           const _id = req.body.id;
           const PrsStepsData = await PrsSteps.findAll({ where: { prId: _id }, order: [['id', 'ASC']] }, { transaction: t });
           const prData = await Purchaserequest.findOne({ where: { id: _id } }, { transaction: t })
           let currentStatus = PrsStepsData.find(o => o.id === prData.stepId)
           let currentStatusIndex = PrsStepsData.indexOf(currentStatus)
           let nextStatus = PrsStepsData[currentStatusIndex + 1]
           let previousStatus = PrsStepsData[currentStatusIndex - 1]
           await Prstepsstatus.update({
               enddate: today, note: req.body.note, updatedBy: req.user.id
           }, {
               where: {
                   stepId: currentStatus.id
               }
           }, { transaction: t });
           switch (req.body.nextStatus) {
               case 'move':
                    if(nextStatus){
                       await Purchaserequest.update({
                           stepId: nextStatus.id,
                           prDepartmentId: nextStatus.departmentId,
                             updatedBy: req.user.id
                       }, {
                           where: {
                               id: _id
                           }
                       }, { transaction: t });
                       await Prstepsstatus.create({
                           createdBy: req.user.id,
                           updatedBy: req.user.id,
                           prId: _id,
                           stepId: nextStatus.id,
                           startdate: today,
                       }, { transaction: t })
                    }else{
                       await Purchaserequest.update({
                           statusId: 3,
                           updatedBy: req.user.id
                       }, {
                           where: {
                               id: _id
                           }
                       }, { transaction: t });
                    }
                   break;
               case 'cancel':
                   await Purchaserequest.update({
                       statusId: 4,
                       updatedBy: req.user.id
                   }, {
                       where: {
                           id: _id
                       }
                   }, { transaction: t });
       
                   break;
            
           }


            return PrsStepsData
        })
        res.json("Done");
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the Credit."
        });
     
    }

};

exports.addStepsTpPr = async (req, res) => {

    try {
        const customData = await db.sequelize.transaction(async (t) => {

            
        
           const prStep = await Prsteps.findAll({
            where: {
                prTypeId: req.body.prTypeId,
                stepType: req.body.stepType
            },
            attributes: { exclude: ['id'] }
        }, { transaction: t });

        for (let i = 0; i < prStep.length; i++) {
            let step = prStep[i]
            await PrsSteps.create({
                createdBy:req.user.id,
                updatedBy:req.user.id,
                description: step.description,
                name: step.name,
                prId: req.body.prId,
                period: step.period,
                sortOrder: step.sortOrder,
                departmentId: step.departmentId,
                hasNext: step.hasNext,
                roleId:step.roleId,
                viewType:  step.viewType,
            }, { transaction: t })
        }
          


            return prStep
        })
        res.json("Done");
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the Credit."
        });
     
    }

};
exports.prViewDashboard = async (req, res) =>{
   
    try {
        const result = {}
        const pr_View = await db.sequelize.query('SELECT * FROM  pr_view where statusId = 2 and stepDepartmentId = '+req.body.dpId+'  and stepRoleId = '+req.body.roId, {
            type: db.sequelize.QueryTypes.SELECT
        });
        result.data = pr_View
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }
}

exports.prViewDashboardWithCommitteeHoc = async (req, res) =>{
    const id = req.params.id;
    try {
        const result = {}//SELECT * FROM `sened-erp`.pr_view WHERE FIND_IN_SET(14, CommitteeIds)>0 and hoc = 14;
        const pr_ViewComHOC = await db.sequelize.query('SELECT * FROM `sened-erp`.pr_view WHERE statusId = 2 and StepName = "EVALS" and  FIND_IN_SET('+id+', CommitteeIds)>0 and hoc ='+id, {
            type: db.sequelize.QueryTypes.SELECT
        });
        result.data = pr_ViewComHOC
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }
}
exports.prViewDashboardWithCommittee = async (req, res) =>{
    const id = req.params.id;
    try {
        const result = {}//SELECT * FROM `sened-erp`.pr_view WHERE FIND_IN_SET(14, CommitteeIds)>0 and hoc = 14;
        const pr_ViewComNoHOC = await db.sequelize.query('SELECT * FROM `sened-erp`.pr_view WHERE statusId = 2 and StepName = "TEE" and FIND_IN_SET('+id+', CommitteeIds)>0 ', {
            type: db.sequelize.QueryTypes.SELECT
        });
        result.data = pr_ViewComNoHOC
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }
}
exports.prView = async (req, res) =>{
    const id = req.params.id;
    try {
        const result = {}//SELECT * FROM `sened-erp`.pr_view WHERE FIND_IN_SET(14, CommitteeIds)>0 and hoc = 14;
        const pr_ViewComNoHOC = await db.sequelize.query('SELECT * FROM `sened-erp`.pr_view WHERE id = '+id, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.json(pr_ViewComNoHOC)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }
}
exports.prViewDashboardProjectBudget = async (req, res) =>{
    const id = req.params.id;
    try {
        const result = {}//SELECT * FROM `sened-erp`.pr_view WHERE FIND_IN_SET(14, CommitteeIds)>0 and hoc = 14;
        const pr_ViewComNoHOC = await db.sequelize.query('SELECT * FROM `sened-erp`.pr_view WHERE statusId = 2 and StepName = "BHA" and pmId = '+id, {
            type: db.sequelize.QueryTypes.SELECT
        });
        result.data = pr_ViewComNoHOC
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }
}