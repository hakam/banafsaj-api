const db = require("../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
var moment = require('moment');
var _ = require('lodash');


const Timesheet = db.timesheet;
const Project_team = db.project_team;
const Holidays = db.holidays;
const Empcontract = db.empcontract;
const Shift = db.shift;
const Timeattendance = db.timeattendance;
const Empleaves = db.empleaves;



const DataLoader = require('../config/core/dataloader')


exports.create = async (req, res) => {

    // req.body month year userId 

    const projects = await Project_team.findAll({
        where: {
            upToDate: {
                [Op.gt]: moment(new Date()).format("YYYY-MM-DD")
            }
        }, attributes: ['projectId'], raw: true
    })
    const contract = await Empcontract.findOne({
        where: {
            terminationDate: {
                [Op.gt]: moment(new Date()).format("YYYY-MM-DD")
            }
        }, raw: true
    })
    const holiday = await Holidays.findAll({
        where: { $and: sequelize.where(sequelize.fn("month", sequelize.col("startDate")), req.body.month), $and: sequelize.where(sequelize.fn("year", sequelize.col("startDate")), req.body.year), applicableShiftId: contract.shiftId }, raw: true
    })
    const leaves = await Empleaves.findAll({
        where: { $and: sequelize.where(sequelize.fn("month", sequelize.col("startingDate")), req.body.month), $and: sequelize.where(sequelize.fn("year", sequelize.col("startingDate")), req.body.year), employeeId: req.body.userId }, raw: true
    })
    const shifts = await Shift.findOne({
        where: { id: contract.shiftId }, raw: true
    })
    const attendance = await Timeattendance.findAll({
        where: { $and: sequelize.where(sequelize.fn("month", sequelize.col("dateTime")), req.body.month), $and: sequelize.where(sequelize.fn("year", sequelize.col("dateTime")), req.body.year), no: req.body.userId }, raw: true
    })

    getDaysArray = function (year, month, project) {
        var monthIndex = month - 1; // 0..11 instead of 1..12
        var names = ['SUN', 'MON', 'TUE', 'WEN', 'THE', 'FRI', 'SAT'];
        var date = new Date(year, monthIndex, 1);
        var resultName = [];
        while (date.getMonth() == monthIndex) {
            resultName.push({
                employeeId: req.body.userId,
                projectId: project,
                name: names[date.getDay()],
                number: date.getDate(),
                dayNo: date.getDay(),
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: moment(date).format("YYYY-MM-DD")
            });
            // resultNumber.push(date.getDate());
            date.setDate(date.getDate() + 1);
        }
        return resultName
    }


    attendance.map(p => {
        p.date = moment(p.dateTime).format("YYYY-MM-DD")

        return p
    })
    let groupedData = _.chain(attendance)
        .groupBy('date')
        .map((log, date) => ({ date, log }))
        .value();
    groupedData.map(p => {
        p.time = p.log.reduce(
            ([result, lastIn], { dateTime, status }) =>
                status === 'C/Out' ? [result + (new Date(dateTime) - lastIn)] : [result, new Date(dateTime)],
            [0],
        ) /
            (1000 * 60 * 60);
        return p
    })
    let weekEnd = shifts.weekend
    for (let index = 0; index < projects.length; index++) {
        const element = projects[index];
        let monthData = getDaysArray(req.body.year, req.body.month, element.projectId);
        monthData.map(p => {
            let timeData = groupedData.find(t => t.date == p.date)
            p.weekEnd = weekEnd.indexOf(p.dayNo) >= 0
            if (timeData) {
                p.time = timeData.time
            } else {
                p.time = 0
            }
            let compareDate = moment(p.date, "YYYY-MM-DD");
            let dateLeavesFound = leaves.find(t => compareDate.isBetween(moment(t.startingDate, "YYYY-MM-DD"), moment(t.endingDate, "YYYY-MM-DD"), undefined, '[]'))
            let dateHolidayFound = holiday.find(t => compareDate.isBetween(moment(t.startDate, "YYYY-MM-DD"), moment(t.endDate, "YYYY-MM-DD"), undefined, '[]'))
              console.log(dateLeavesFound);
            if (dateLeavesFound) {
                p.leave = true
                p.leaveDuration = dateLeavesFound.leaveDuration
                p.leaveName = dateLeavesFound.nameId
            } else {
                p.leave = false
                p.leaveDuration = 0
                p.leaveName = null
            }
            if (dateHolidayFound) {
                p.holiday = true
            } else {
                p.holiday = false
            }
        })
        console.table(monthData);
        Timesheet.bulkCreate(monthData)
            .then(async data => { })

    }




    res.send("ok");








    // getDaysArray = function (year, month) {
    //     var monthIndex = month - 1; // 0..11 instead of 1..12
    //     var names = ['SUN', 'MON', 'TUE', 'WEN', 'THE', 'FRI', 'SAT'];
    //     var date = new Date(year, monthIndex, 1);
    //     var resultName = [];
    //     while (date.getMonth() == monthIndex) {
    //         resultName.push({ projectId: 10, name: names[date.getDay()], number: date.getDate(), dayNo: date.getDay(),date: moment(date).format("YYYY-MM-DD") });
    //         // resultNumber.push(date.getDate());
    //         date.setDate(date.getDate() + 1);
    //     }
    //     return resultName
    // }
















    // Save Timesheet in the database
    // Timesheet.create(req.body)
    //     .then(async data => {

    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Timesheet."
    //         });
    //     });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('timesheet', req.query)
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

    Timesheet.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Timesheet with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Timesheet.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Timesheet was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Timesheet with id=${id}. Maybe Timesheet was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Timesheet with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Timesheet.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Timesheet was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Timesheet with id=${id}. Maybe Timesheet was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Timesheet with id=" + id
            });
        });
};
