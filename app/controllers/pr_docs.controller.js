const db = require("../models");
const Pr_docs = db.pr_docs;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Pr_docs in the database
    Pr_docs.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pr_docs."
            });
        });
};
exports.findAll = async (req, res) => {
 
    try {
        const dataLoader = new DataLoader('pr_docs', req.query)
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

    Pr_docs.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pr_docs with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Pr_docs.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Pr_docs was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pr_docs with id=${id}. Maybe Pr_docs was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pr_docs with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;
    Pr_docs.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {
            if (num[0] == 1) {

                res.send({
                    message: "Pr_docs was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pr_docs with id=${id}. Maybe Pr_docs was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pr_docs with id=" + id
            });
        });
};

exports.uploadDoc = async (req, res) => {

    console.log(req.body);
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
        let path = req.body.path + "/" + req.file.filename
        if(req.file.mimetype.startsWith("image")){
            
            documentType = 'image'
        }else if(req.file.mimetype.startsWith("application/pdf")){
            documentType = 'pdf'
        }
        Pr_docs.create({
            employeeId: req.body.id,
            docId: req.body.type,
            path: path,
            docType: documentType,
            docDate: req.body.docDate,
            docuuid: req.body.docuuid,
            docnote: req.body.docnote,
            createdBy:req.body.createdBy
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
