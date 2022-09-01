const db = require("../models");
const { Op } = require("sequelize");
const Leavetypes = db.leavetypes;
const DataLoader = require('../config/core/dataloader')
const Employee = db.employee;
var moment = require('moment');
var cron = require('node-cron');
const LeaveReport = db.leaveReport;
const Empleaves = db.empleaves;
var slugify = require('slugify')



exports.create = (req, res) => {
    // Save Leavetypes in the database
    Leavetypes.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Leavetypes."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('leavetypes', req.query)
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

    Leavetypes.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Leavetypes with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Leavetypes.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Leavetypes was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Leavetypes with id=${id}. Maybe Leavetypes was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Leavetypes with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Leavetypes.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Leavetypes was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Leavetypes with id=${id}. Maybe Leavetypes was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Leavetypes with id=" + id
            });
        });
};

exports.getMyLeaves = async (req, res) => {
    let employeeId = req.body.empId
    await Employee.findByPk(employeeId)
        .then(async data => {
            var a = moment(new Date());
            let dt = a.diff(data.senedStartDate, 'days')
            var years = 0
            while (dt >= 365) {
                dt -= 365;
                years++;
            }
            var startdate = moment().subtract(dt, 'd');
            var searchDate = moment(startdate).format("YYYY-MM-DD")
            const result = {}
            result.list = []
            const annual = await db.sequelize.query(
                `select sum(NoOf) as count from leavetypes where nameId = 1 and days >= 365 and days <= DATEDIFF(CURDATE(),'` + data.senedStartDate + `')`
                , {
                    type: db.sequelize.QueryTypes.SELECT
                });

            const forAllLeaves = await db.sequelize.query(
                `  select id,displayName,NoOf as count,paidType,accrual,nameId,unit,daysType from (SELECT id,nameId,daysTo,NoOf,accrual,paidType,displayName,days,daysType,unit,DATEDIFF(CURDATE(),'` + data.senedStartDate + `') as dw 
                   ,DATEDIFF(CURDATE(),'` + data.senedStartDate + `') > days
                   AND applicableFor = 'All'
                   AND (applicableGender = '`+ data.sex + `'
                   OR applicableGender = 'All' )as 'av'
                   FROM
                   leavetypes) as t1  where t1.av = 1 and (t1.dw between t1.days and t1.daysTo)`

                , {
                    type: db.sequelize.QueryTypes.SELECT
                });

            for (let i = 0; i < forAllLeaves.length; i++) {
                const leaveName = forAllLeaves[i]

                switch (leaveName.accrual) {
                    case "yearly":
                        if (leaveName.nameId == 1 && leaveName.id == 1) {
                            const takenLeavesYearly = await db.sequelize.query('SELECT sum(leaveDuration) as count FROM empleaves where employeeId =  "' + employeeId + '" and typeId = "' + leaveName.id + '" and  completed = 1 and  status = "Approval" ', {
                                type: db.sequelize.QueryTypes.SELECT
                            });
                            leaveName['taken'] = takenLeavesYearly[0].count || 0;
                            leaveName['balance'] = annual[0].count - takenLeavesYearly[0].count || 0;
                            if (leaveName.balance == 0) {
                                leaveName['disabled'] = true
                            } else {
                                leaveName['disabled'] = false
                            }

                        } else {
                            const takenLeavesYearlySick = await db.sequelize.query('SELECT sum(leaveDuration) as count FROM empleaves where employeeId =  "' + employeeId + '" and typeId = "' + leaveName.id + '" and  completed = 1 and  status = "Approval" and startingDate > "' + searchDate + '"', {
                                type: db.sequelize.QueryTypes.SELECT
                            });
                            leaveName['taken'] = takenLeavesYearlySick[0].count || 0;
                            leaveName['balance'] = leaveName.count - takenLeavesYearlySick[0].count || 0;
                            if (leaveName.balance == 0) {
                                leaveName['disabled'] = true
                            } else {
                                leaveName['disabled'] = false
                            }
                        }

                        break;
                    case "monthly":
                        var month = 0
                        while (dt >= 30) {
                            dt -= 30;
                            month++;
                        }
                        var startDate = moment().subtract(dt, 'd');
                        var searchDate = moment(startDate).format("YYYY-MM-DD")
                        const takenLeavesMonthly = await db.sequelize.query('SELECT sum(leaveDuration) as count FROM empleaves where employeeId =  "' + employeeId + '" and typeId = "' + leaveName.id + '" and  completed = 1 and  status = "Approval" and startingDate > "' + searchDate + '"', {
                            type: db.sequelize.QueryTypes.SELECT
                        });

                        leaveName['taken'] = takenLeavesMonthly[0].count || 0;
                        leaveName['balance'] = leaveName.count - takenLeavesMonthly[0].count || 0;
                        if (leaveName.balance == 0) {
                            leaveName['disabled'] = true
                        } else {
                            leaveName['disabled'] = false
                        }

                        break;
                    case "occasional":
                        const takenLeavesOccasional = await db.sequelize.query('SELECT sum(leaveDuration) as count FROM empleaves where employeeId =  "' + employeeId + '" and typeId = "' + leaveName.id + '" and  completed = 1 and  status = "Approval" ', {
                            type: db.sequelize.QueryTypes.SELECT
                        });
                        leaveName['taken'] = takenLeavesOccasional[0].count || 0;
                        leaveName['balance'] = leaveName.count - takenLeavesOccasional[0].count || 0;
                        if (leaveName.balance == 0) {
                            leaveName['disabled'] = true
                        } else {
                            leaveName['disabled'] = false
                        }
                        break;
                    case "once":
                        const takenLeavesOnce = await db.sequelize.query('SELECT sum(leaveDuration) as count FROM empleaves where employeeId =  "' + employeeId + '" and typeId = "' + leaveName.id + '" and  completed = 1 and  status = "Approval" ', {
                            type: db.sequelize.QueryTypes.SELECT
                        });
                        leaveName['taken'] = takenLeavesOnce[0].count || 0;
                        leaveName['balance'] = leaveName.count - takenLeavesOnce[0].count || 0;
                        if (leaveName.balance == 0) {
                            leaveName['disabled'] = true
                        } else {
                            leaveName['disabled'] = false
                        }
                        break;
                }

            }
            result.list.push(...forAllLeaves)


            if (data.disabledEmp) {
                const disabledLeaves = await db.sequelize.query(
                    ` select id,displayName,NoOf as count,paidType,accrual,nameId,unit,daysType from (SELECT id,nameId,daysTo,NoOf,accrual,paidType,displayName,days,daysType,unit,DATEDIFF(CURDATE(),'` + data.senedStartDate + `') as dw 
                    ,DATEDIFF(CURDATE(),'` + data.senedStartDate + `') > days
                    AND (applicableFor = 'disabledEmp'
                    )as 'av'
                    FROM
                    leavetypes) as t1  where t1.av = 1 and (t1.dw between t1.days and t1.daysTo)`, {
                    type: db.sequelize.QueryTypes.SELECT
                });
                for (let i = 0; i < disabledLeaves.length; i++) {
                    const leaveName = disabledLeaves[i]
                    const takenLeaves = await db.sequelize.query('SELECT count(leaveDuration) as count FROM empleaves where employeeId =  "' + employeeId + '" and typeId = "' + leaveName.id + '" and  completed = 1 and  status = "Approval" and startingDate > "' + searchDate + '"', {
                        type: db.sequelize.QueryTypes.SELECT
                    });
                    leaveName['taken'] = takenLeaves[0].count || 0;
                    leaveName['balance'] = leaveName.count - takenLeaves[0].count || 0;
                    if (leaveName.balance == 0) {
                        leaveName['disabled'] = true
                    } else {
                        leaveName['disabled'] = false
                    }
                }
                result.list.push(...disabledLeaves)
            }
            if (data.disabledChild) {
                const disabledChildLeaves = await db.sequelize.query(

                    `
                  select id,displayName,NoOf as count,paidType,accrual,nameId,unit,daysType from (SELECT id,nameId,daysTo,NoOf,accrual,paidType,displayName,days,daysType,unit,DATEDIFF(CURDATE(),'` + data.senedStartDate + `') as dw 
                   ,DATEDIFF(CURDATE(),'` + data.senedStartDate + `') > days
                   AND (applicableFor = 'disabledChild'
                   )as 'av'
                   FROM
                   leavetypes) as t1  where t1.av = 1 and (t1.dw between t1.days and t1.daysTo)` , {
                    type: db.sequelize.QueryTypes.SELECT
                });

                for (let i = 0; i < disabledChildLeaves.length; i++) {
                    const leaveName = disabledChildLeaves[i]
                    const takenLeaves = await db.sequelize.query('SELECT count(leaveDuration) as count FROM empleaves where employeeId =  "' + employeeId + '" and nameId = "' + leaveName.id + '" and  completed = 1 and  status = "Approval" and startingDate > "' + searchDate + '"', {
                        type: db.sequelize.QueryTypes.SELECT
                    });
                    leaveName['taken'] = takenLeaves[0].count || 0;
                    leaveName['balance'] = leaveName.count - takenLeaves[0].count || 0;
                    if (leaveName.balance == 0) {
                        leaveName['disabled'] = true
                    } else {
                        leaveName['disabled'] = false
                    }
                }
                result.list.push(...disabledChildLeaves)

            }

            res.send(result);

        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });




};


exports.getAllMyLeaves = async (req, res) => {




    try {
        const allEmpData = await Employee.findAll({
            where: {
                // id: [1, 4,7,116],
                status: {
                    [Op.ne]: "resigned",
                }
            }, attributes: ['id', 'code', 'senedStartDate', 'firstName', 'lastName', 'disabledEmp', 'disabledChild', 'sex'], raw: true
        })
        const result = {}
        for (let i = 0; i < allEmpData.length; i++) {
            const empData = allEmpData[i]
            empData['annual_balance'] = 0
            empData['annual_used'] = 0;
            empData['annual_remain'] = 0
            empData['sick_used'] = 0;
            empData['date'] = empData.senedStartDate;
            empData['paid_taken'] = 0
            empData['unpaid_taken'] = 0;
            empData['days'] = 0;
            //     list = []
            var a = moment(new Date());
            var b = moment(empData.senedStartDate);
            empData['days'] = a.diff(b, 'days')
            let dt = a.diff(b, 'days')
            let year = a.diff(b, 'year');
         
            var years = 0
            const annual = await db.sequelize.query(
                `select sum(NoOf) as count from leavetypes where nameId = 1 and days >= 365 and days <= DATEDIFF(CURDATE(),'` + empData.senedStartDate + `')`
                , {
                    type: db.sequelize.QueryTypes.SELECT
                });
            const takenLeavesSickYearly = await db.sequelize.query(`select sum(NoOf) as count from leavetypes where nameId = 2 and  ` + dt + ` between days and  daysTo`, {
                type: db.sequelize.QueryTypes.SELECT
            });
            if (year >= 1) {
                empData['annual_balance'] = Number(annual[0].count) * year
            } else {
                empData['annual_balance'] = 0
            }
            while (dt >= 365) {
                dt -= 365;
                years++;
            }
            var startdate = moment().subtract(dt, 'd');
            var searchDate = moment(startdate).format("YYYY-MM-DD")
            const takenLeavesYearly = await db.sequelize.query('SELECT sum(leaveDuration) as count FROM empleaves where employeeId =  "' + empData.id + '" and nameId = 1  and  completed = 1 and  status = "Approval" ', {
                type: db.sequelize.QueryTypes.SELECT
            });
            let T=  Number(takenLeavesYearly[0].count) || 0
            let D = 0
             while (T >= 8) {
             T -= 8;
              D++;
            }
            empData['annual_used'] = "D:"+D+" H:"+T ;
            let T0=  (empData['annual_balance'] - Number(takenLeavesYearly[0].count)) || 0;
            let D0 = 0
             while (T0 >= 8) {
             T0 -= 8;
              D0++;
            }
            empData['annual_remain'] = "D:"+D0+" H:"+T0 ;
            const takenSickLeavesYearly = await db.sequelize.query('SELECT sum(leaveDuration) as count FROM empleaves where employeeId =  "' + empData.id + '" and nameId = 2  and  completed = 1 and  status = "Approval" and startingDate > "' + searchDate + '" ', {
                type: db.sequelize.QueryTypes.SELECT
            });
            empData['sick_used'] = Number(takenSickLeavesYearly[0].count) || 0;
            const takenLeavesPaidYearly = await db.sequelize.query('SELECT sum(leaveDuration) as count FROM empleaves where employeeId =  "' + empData.id + '" and nameId = 4  and  completed = 1 and  status = "Approval" and startingDate > "' + searchDate + '" ', {
                type: db.sequelize.QueryTypes.SELECT
            });
            let T1= Number(takenLeavesPaidYearly[0].count) || 0;
            let D1 = 0
             while (T1 >= 8) {
             T1 -= 8;
              D1++;
            }
            empData['paid_taken'] = "D:"+D1+" H:"+T1 ;
            const takenLeavesUnpaidYearly = await db.sequelize.query('SELECT sum(leaveDuration) as count FROM empleaves where employeeId =  "' + empData.id + '" and nameId = 5  and  completed = 1 and  status = "Approval" and startingDate > "' + searchDate + '" ', {
                type: db.sequelize.QueryTypes.SELECT
            });
            let T2= Number(takenLeavesUnpaidYearly[0].count) || 0;
            let D2 = 0
             while (T2 >= 8) {
             T2 -= 8;
              D2++;
            }
            empData['unpaid_taken'] = "D:"+D2+" H:"+T2 ;





        }
        res.send(allEmpData);
    } catch (error) {
        res.status(500).send({
            message: error
        });
    }







};
