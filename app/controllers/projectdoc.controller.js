const db = require("../models");
const Projectdoc = db.projectdoc;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Projectdoc in the database
    Projectdoc.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Projectdoc."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('projectdoc', req.query)
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

    Projectdoc.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Projectdoc with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Projectdoc.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Projectdoc was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Projectdoc with id=${id}. Maybe Projectdoc was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Projectdoc with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Projectdoc.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Projectdoc was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Projectdoc with id=${id}. Maybe Projectdoc was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Projectdoc with id=" + id
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
    
        Projectdoc.create({
            projectId: req.body.id,
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
                        err.message || "Some error occurred while creating the Projectdoc."
                });
            });


    }

};