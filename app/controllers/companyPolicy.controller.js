const db = require("../models");
const CompanyPolicy = db.companyPolicy;
const DataLoader = require('../config/core/dataloader')
const Auditlog = db.auditlog;
var path = require("path");
const fs = require("fs");

exports.create = (req, res) => {
    // Save CompanyPolicy in the database
    CompanyPolicy.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the CompanyPolicy."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('companyPolicy', req.query)
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

    CompanyPolicy.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving CompanyPolicy with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    CompanyPolicy.update(req.body, {
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {
            if (num[0] == 1) {
                res.send({
                    message: "CompanyPolicy was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update CompanyPolicy with id=${id}. Maybe CompanyPolicy was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating CompanyPolicy with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    CompanyPolicy.destroy({
        where: { id: id },
        individualHooks: true
    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "CompanyPolicy was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete CompanyPolicy with id=${id}. Maybe CompanyPolicy was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete CompanyPolicy with id=" + id
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
        let path = req.file.filename
        if (req.file.mimetype.startsWith("image")) {

            documentType = 'image'
        } else if (req.file.mimetype.startsWith("application/pdf")) {
            documentType = 'pdf'
        }
        CompanyPolicy.create({
            name: req.body.name,
            path: path,
            docType: documentType,
            docDate: req.body.docDate,
            docnote: req.body.docnote,
            createdBy: req.body.createdBy
        })
            .then(data => {
                console.log(req.body);
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Empdocs."
                });
            });


    }

};


exports.getFile = (req, res) => {
    try {
        const fileName = req.params.id;
       
        if (fs.existsSync(path.join(__dirname, '../../public/' + fileName))) {
            res.sendFile(path.join(__dirname, '../../public/' + fileName));
        } else {
            res.send({
                message: "Could not find File"
            });
        }


    } catch (error) {
        res.status(500).send({
            message: "Could not find "
        });
    }

}