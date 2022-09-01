const db = require("../models");
const Grants = db.grants;
const projects = db.projects;

const DataLoader = require('../config/core/dataloader')
const GrantsPrograms = db.grantsPrograms;
const GrantsCities = db.grantsCities;
const GrantsCountries = db.grantsCountries;


exports.create = (req, res) => {
    // Save Grants in the database
    Grants.create(req.body)
        .then(async data => {
            req.body.programs.map(p => { p.grantId = data.id; return p })
            req.body.cities.map(p => { p.grantId = data.id; return p })
            req.body.countries.map(p => { p.grantId = data.id; return p })
            await GrantsPrograms.bulkCreate(req.body.programs)
            await GrantsCities.bulkCreate(req.body.cities)
            await GrantsCountries.bulkCreate(req.body.countries)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Grants."
            });
        });
};
exports.findAllWithPrograms = async (req, res) => {

    try {
        const dataLoader = new DataLoader('grants', req.query)
        const result = await dataLoader.load()
        for (let p = 0; p < result.data.length; p++) {
             let grantData = result.data[p]
             let programsData = await GrantsPrograms.findAll({
                where: { grantId: grantData.id }
            })
            let citiesData = await GrantsCities.findAll({
                where: { grantId: grantData.id },
                attributes: [['cityId','id']]
            })
            let countriesData = await GrantsCountries.findAll({
                where: { grantId: grantData.id },
                attributes: [['countryId','id']]
            })
            grantData['programs'] = programsData
            grantData['cities'] = citiesData.map(account => account.id);
            grantData['countries'] = countriesData.map(account => account.id);

        }
       
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }

};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('grants', req.query)
        const result = await dataLoader.load()
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }

};
exports.findOne = async (req, res) => {
    const id = req.params.id;

    Grants.findByPk(id)
        .then( async data => {
            const programsData = await GrantsPrograms.findAll({
                where: { grantId: id },
                raw: true,
            })
            const citiesData = await GrantsCities.findAll({
                where: { grantId: id },
                attributes: [['cityId','id']],
                raw: true,
            })
            const countriesData = await GrantsCountries.findAll({
                where: { grantId: id },
                attributes:  [['countryId','id']],
                raw: true,
            })
            data.dataValues['programs'] = programsData
            data.dataValues['cities'] = citiesData.map(account => account.id);
            data.dataValues['countries'] = countriesData.map(account => account.id);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Grants with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Grants.update(req.body, {
        where: { id: id }
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Grants was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Grants with id=${id}. Maybe Grants was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Grants with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Grants.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Grants was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Grants with id=${id}. Maybe Grants was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Grants with id=" + id
            });
        });
};
exports.convertGrantToProject = async (req, res) => {
    // Save Grants in the database
    try {
        const projectData = await db.sequelize.transaction(async (t) => {

            const grant = await Grants.findOne({ where: { id: req.body.id } }, { transaction: t })

            await projects.create(
                {
                    createdBy:req.body.createdBy,
                    updatedBy: req.body.updatedBy,
                    officeId: req.body.officeId,
                    name : grant.grantName,
                    donorId:grant.donorId,
                    sDate: grant.GrantsDate,
                    exDate: grant.expireDate,
                    amount:grant.grantAmount,
                    currency: grant.currency,
                    exchangeRate:grant.exchangeRate,
                    programId:grant.programId,
                    prPolicy :grant.prPolicy,
                    statusId:1,
                    ceoComments: req.body.ceoComments,
                    ceoApprovalDate: req.body.ceoApprovalDate,
                    description:grant.description,
                    pmId: req.body.pmId, 
                    prCode: req.body.prCode,
                    adminFee:req.body.adminFee,
                }
                , { transaction: t });
               await Grants.update({
                    canDelete :false,
                    ceoApp :true,
                    ceoComments:req.body.ceoComments
                } , {where: { id: grant.id }},{ transaction: t })
              
           return projects
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

