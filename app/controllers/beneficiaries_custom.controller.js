const db = require("../models");
const Beneficiaries_custom = db.beneficiaries_custom;
const Beneficiaries_custom_list = db.beneficiaries_custom_list;

const DataLoader = require('../config/core/dataloader')


exports.create = async (req, res) => {

    try {
        const customData = await db.sequelize.transaction(async (t) => {

            const Data = await Beneficiaries_custom.create(req.body, { transaction: t })
            if (req.body.options.length > 0) {
                for (let i = 0; i < req.body.options.length; i++) {
                    let option = req.body.options[i]
                    await Beneficiaries_custom_list.create({
                        createdBy: req.body.createdBy,
                        updatedBy: req.body.updatedBy,
                        projectId:req.body.projectId,
                        customId:Data.id,
                        key: option.key,
                        value: option.value
                    }, { transaction: t })
                }
            }


            return Data
        })
        res.json("Done");
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the Credit."
        });
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
    }
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('beneficiaries_custom', req.query)
        const result = await dataLoader.load()
        for (let index = 0; index < result.data.length; index++) {
            let filed = result.data[index]
            if (filed.type == 'select') {
                let optionData = await Beneficiaries_custom_list.findAll({
                    where: { customId: filed.id }
                })

                result.data[index]["options"] = optionData
            }
        }
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

    Beneficiaries_custom.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Beneficiaries_custom with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Beneficiaries_custom.update(req.body, {
        where: { id: id },
      individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Beneficiaries_custom was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Beneficiaries_custom with id=${id}. Maybe Beneficiaries_custom was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Beneficiaries_custom with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Beneficiaries_custom.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Beneficiaries_custom was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Beneficiaries_custom with id=${id}. Maybe Beneficiaries_custom was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Beneficiaries_custom with id=" + id
            });
        });
};
