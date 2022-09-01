const db = require("../models");
const Departmentshift = db.departmentshift;


exports.create = (req, res) => {
    // Save Departmentshift in the database
    Departmentshift.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Departmentshift."
            });
        });
};
exports.findAll = async (req, res) => {
    
    try {
        const dataLoader = new DataLoader('departmentshift', req.query)
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

    Departmentshift.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Departmentshift with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Departmentshift.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Departmentshift was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Departmentshift with id=${id}. Maybe Departmentshift was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Departmentshift with id=" + id
            });
        });
};
exports.delete =  async (req, res) => {
    const id = req.params.id;

    Departmentshift.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then( async num => {

            if (num[0] == 1) {
                res.send({
                    message: "Departmentshift was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Departmentshift with id=${id}. Maybe Departmentshift was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Departmentshift with id=" + id
            });
        });
};
