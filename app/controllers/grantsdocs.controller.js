const db = require("../models");
const Grantsdocs = db.grantsdocs;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Grantsdocs in the database
    Grantsdocs.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Grantsdocs."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('grantsdocs', req.query)
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

    Grantsdocs.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Grantsdocs with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Grantsdocs.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Grantsdocs was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Grantsdocs with id=${id}. Maybe Grantsdocs was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Grantsdocs with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    Grantsdocs.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then( async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Grantsdocs was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Grantsdocs with id=${id}. Maybe Grantsdocs was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Grantsdocs with id=" + id
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
      
        let path = req.body.path + "/" + req.file.filename
        if(req.file.mimetype.startsWith("image")){
            documentType = 'image'
        }else if(req.file.mimetype.startsWith("application/pdf")){
            documentType = 'pdf'
        }else{
            var arr = req.file.filename.split('.');
            documentType = arr[arr.length-1];
        }
    
        Grantsdocs.create({
            grantId: req.body.id,
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
                        err.message || "Some error occurred while creating the Grantsdocs."
                });
            });


    }

};