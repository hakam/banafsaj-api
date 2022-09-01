const db = require("../models");
const LeaveReportView = db.leaveReportView;
const DataLoader = require('../config/core/dataloader')
const { QueryTypes } = require('sequelize');



exports.findAll = async (req, res) => {

    try {

        //const dataLoader = new DataLoader('leaveReportView', req.query)
        const data = await db.sequelize.query("SELECT * FROM leaveReportView ", { type: QueryTypes.SELECT });
        const result = {}
          result.data = data
       
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

    LeaveReportView.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving LeaveReportView with id=" + id
            });
        });
};
