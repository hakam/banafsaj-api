const db = require("../models");
const Timeattendance = db.timeattendance;
const DataLoader = require('../config/core/dataloader')
var moment = require('moment');
var _ = require('lodash');
const QueryTypes = require('sequelize');


exports.createBulk = async (req, res) => {
   try {
    let data = req.body
    console.log(req.body);
    let record = 0
    for (let i = 0, l = data.length; i < l; i++) {
        let rec = data[i]
      await  Timeattendance.create(rec)
        record++
    }
    res.json({ "Total": record });  
   } catch (error) {
    res.status(500).send({
        message:
        error.message || "Some error occurred while creating the Timeattendance."
    }) 
   }
    


};
exports.create = (req, res) => {
    // Save Timeattendance in the database
    Timeattendance.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Timeattendance."
            });
        });
};
exports.findAll = async (req, res) => {
    try {
        const dataLoader = new DataLoader('timeattendance', req.query)
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

    Timeattendance.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Timeattendance with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Timeattendance.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Timeattendance was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Timeattendance with id=${id}. Maybe Timeattendance was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Timeattendance with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Timeattendance.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Timeattendance was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Timeattendance with id=${id}. Maybe Timeattendance was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Timeattendance with id=" + id
            });
        });
};


exports.findAllWithInAndOut = async (req, res) => {
    try {
        const dataLoader = new DataLoader('timeattendance', req.query)
        const result = await dataLoader.load()
        for (let i = 0; i < result.data.length; i++) {
            let empData = result.data[i].items
            console.log(empData.length);
            empData.map(p => {
                p.date = moment(p.dateTime).format("YYYY-MM-DD")
                return p
            })
            let groupedData = _.chain(empData)
                .groupBy('date')
                .map((log, date) => ({ date, log }))
                .value()
            groupedData.map(p => {
                p.time = p.log.reduce(
                    ([result, lastIn], { dateTime, status }) =>
                        status === 'C/Out' ? [result + (new Date(dateTime) - lastIn)] : [result, new Date(dateTime)],
                    [0],
                ) /
                    (1000 * 60 * 60);
                let start = _.minBy(p.log, function (o) { return o.dateTime })
                let end = _.maxBy(p.log, function (o) { return o.dateTime })
                p.start = start.dateTime
                p.end = end.dateTime
                return p
            })
            result.data[i].items = groupedData
        }
        // console.table(groupedData)
        // result.data = groupedData
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }

}

exports.findNullCheck = async (req, res) => {
   try {
    const attend = await db.sequelize.query(`select * from (
        SELECT no,DATE(dateTime) as attendance_date,
               MIN(IF(status='C/In',dateTime,NULL)) AS time_in, 
               MAX(IF(status='C/Out',dateTime,NULL)) AS time_out
        FROM timeattendance
        GROUP BY no,DATE(dateTime)
        )as t where t.time_in is null or t.time_out is null 
        `, {raw: true, type: QueryTypes.SELECT });
    if(attend && attend.length > 0){
        res.send(attend[0]); 
    }else{
        res.send(attend);  
    }
    
   } catch (error) {
    res.status(500).send({
        message: "Error retrieving Timeattendance with id=" + id
    });
   }



  
}
exports.findMax = async (req, res) => {

try {
    const attend = await db.sequelize.query(`select max(dateTime) as lastDate from timeattendance
    `, {raw: true, type: QueryTypes.SELECT });
    if(attend && attend.length > 0){
        res.send(attend[0]); 
    }else{
        res.send(attend);  
    }
    
} catch (error) {
    res.status(500).send({
        message: "Error retrieving Timeattendance with id=" + id
    });
}
  
}