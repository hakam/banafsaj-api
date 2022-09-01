const db = require("../models");
const InoutData = db.inoutData;
const DataLoader = require('../config/core/dataloader')
const QueryTypes = require('sequelize');
var moment = require('moment');


exports.create = (req, res) => {
    // Save InoutData in the database
    InoutData.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the InoutData."
            });
        });
};
exports.createData = async (req, res) => {


     try {
        const attend = await db.sequelize.query(`select * from (
            SELECT no,DATE(dateTime) as attendance_date,department,idNumber,locationId,
                   MIN(IF(status='C/In',dateTime,NULL)) AS time_in, 
                   MAX(IF(status='C/Out',dateTime,NULL)) AS time_out
            FROM timeattendance
            GROUP BY no,DATE(dateTime),department,idNumber,locationId
            )as t where (t.time_in is NOT NULL and t.time_out is NOT NULL)
            and Date(t.attendance_date) > Date("`+ req.body.date + `")`, { raw: true, type: QueryTypes.SELECT });
        if (attend[0].length > 0) {
            for (var i = 0; i < attend[0].length; i++) {
                let line = attend[0][i];
                let timeIn = moment(line.time_in)
                let timeOut = moment(line.time_out)
                let totalTime =  timeOut.diff(timeIn,"hours");
                InoutData.create({
                    createdBy: req.body.createdBy,
                    updatedBy: req.body.updatedBy,
                    no: line.no,
                    attendance_date: line.attendance_date,
                    time_in: line.time_in,
                    time_out: line.time_out,
                    departmentId: line.department,
                    branchId: line.locationId,
                    code: line.idNumber,
                    total : totalTime
                })
    
            }
        }
    
        res.json("Done")
     } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
     }
  





};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('inoutData', req.query)
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

    InoutData.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving InoutData with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    InoutData.update(req.body, {
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "InoutData was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update InoutData with id=${id}. Maybe InoutData was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating InoutData with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    InoutData.destroy({
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "InoutData was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete InoutData with id=${id}. Maybe InoutData was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete InoutData with id=" + id
            });
        });
};

exports.findMax = async (req, res) => {

    try {
        const attend = await db.sequelize.query(`select max(attendance_date) as lastDate from inoutData
        union all
        select max(dateTime) as lastDate from timeattendance`, { raw: true, type: QueryTypes.SELECT });
        if (attend && attend.length > 0) {
            res.send(attend[0]);
        } else {
            res.send(attend);
        }

    } catch (error) {
        res.status(500).send({
            message: "Error retrieving Timeattendance with id=" + id
        });
    }

}