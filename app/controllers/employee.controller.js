const db = require("../models");
const Employee = db.employee;
const DataLoader = require('../config/core/dataloader')
const sequelize = require('sequelize');
const Users = db.users;


exports.create = async (req, res) => {
    // Save Employee in the database
    var maxIdData
    var allData = {}
    await Employee.findAll({
        attributes: [[sequelize.fn('max', sequelize.col('codeNo')), 'maxNo']],
        raw: true,
        }).then((maxIds) => {
        maxIdData = maxIds[0].maxNo
       
      });
    if (maxIdData){
         codeData = { codeNo:maxIdData+1};
       
    }else{
        codeData = { codeNo:1};  
    }
     allData = Object.assign(req.body, codeData);
    Employee.create(allData)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employee."
            });
        });
};
exports.findAll = async (req, res) => {
    
   
    try {
        const dataLoader = new DataLoader('employee', req.query)
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

    Employee.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Employee with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Employee.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

                res.send({
                    message: "Employee was updated successfully."
                });
         
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id=" + id + err
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Employee.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id=" + id
            });
        });
};
exports.updateMailMobile = (req, res) => {
    const id = req.params.id;

    Employee.update(req.body, {
        where: { code: id }
    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Employee was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id=" + id
            });
        });
};
exports.uploadDoc = async (req, res) => {

   
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
        let path = 'assets/empdoc/avatar/'+ req.file.filename
        if(req.file.mimetype.startsWith("image")){
            
            documentType = 'image'
        }else if(req.file.mimetype.startsWith("application/pdf")){
            documentType = 'pdf'
        }

        Employee.update({avatar:path}, {
            where: { id: req.body.id }
        })
            .then(data => {
                Users.update({avatar:path}, {
                    where: { employeeId: req.body.id }
                })
                    .then(num => {
                        if (num[0] == 1) {
                            res.send({
                                message: "Users was updated successfully."
                            });
                        } else {
                            res.send({
                                message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
                            });
                        }
                    })
                 })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Empdocs."
                });
            });


    }

};
exports.employeeWithUser = async (req,res)=>{
    try {
        const employeeData = await db.sequelize.transaction(async (t) => {
            var maxIdData
            var allData = {}
            const Data = await Employee.findAll({
                attributes: [[sequelize.fn('max', sequelize.col('codeNo')), 'maxNo']],
                raw: true,
                }, { transaction: t }).then((maxIds) => {
                maxIdData = maxIds[0].maxNo
               
              });
            if (maxIdData){
                 codeData = { codeNo:maxIdData+1};
               
            }else{
                codeData = { codeNo:1};  
            }
             allData = Object.assign(req.body, codeData);

            const newEmployee =  await Employee.create(allData)
            if(newEmployee){
                const newEmployeeWithCode = await Employee.findOne({where:{id:newEmployee.id}},{transaction: t })
                req.employeeId = newEmployeeWithCode.id
                req.body.employeeCode = newEmployeeWithCode.code
                req.body.status = 1
                const userData = await Users.create(req.body)
                if(userData){
                    return newEmployeeWithCode
                }else{
                    throw new Error('Canot Create User');
                }
            }else{
                throw new Error('Canot Create Employee');
            }
          

           
        })
        res.json({id:employeeData.id});

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the Credit."
        });
       
    } 
}