const db = require("../models");
const CommentDocs = db.commentDocs;
const DataLoader = require('../config/core/dataloader')
var path = require("path");
const fs = require("fs");

exports.create = (req, res) => {
    // Save CommentDocs in the database
    CommentDocs.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the CommentDocs."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('commentDocs', req.query)
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

    CommentDocs.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving CommentDocs with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    CommentDocs.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "CommentDocs was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update CommentDocs with id=${id}. Maybe CommentDocs was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating CommentDocs with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    CommentDocs.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "CommentDocs was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete CommentDocs with id=${id}. Maybe CommentDocs was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete CommentDocs with id=" + id
            });
        });
};

exports.uploadDocSingle = async (req, res) => {


    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
        let path = req.file.filename
    
        CommentDocs.create({
            taskId:req.body.taskId,
            commentId: req.body.commentId,
            fileName: path,
            originalName: req.file.originalname,
            createdBy: req.body.createdBy,
            docType: req.file.mimetype
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
exports.uploadDocMulti = async (req, res) => {


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
        CommentDocs.create({
            taskId:req.body.taskId,
            commentId: req.body.commentId,
            fileName: path,
            originalName: req.file.originalname,
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
        const fileName = req.params.folder+'/'+req.params.id+'/'+req.params.name;

        if (fs.existsSync(path.join(__dirname, '../../public/' + fileName))) {
            res.sendFile(path.join(__dirname, '../../public/' + fileName));
        } else {
            res.send({
                message: "Could not find File"
            });
        }


    } catch (error) {
        res.status(500).send({
            message: "Could not find "+error
        });
    }

}