const db = require("../models");
const RoleEntity = db.roleEntity;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save RoleEntity in the database
    RoleEntity.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the RoleEntity."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('roleEntity', req.query)
        const result = await dataLoader.load()
        // const nest = (items, menuId = null, link = 'menuIdParenId') =>
        //     items.filter(item => item[link] === menuId).map(item => ({ ...item, children: nest(items, item.menuId) }));
        // const treeData = await nest(result.data)
        // result.data = treeData
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

    RoleEntity.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RoleEntity with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    RoleEntity.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "RoleEntity was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update RoleEntity with id=${id}. Maybe RoleEntity was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating RoleEntity with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    RoleEntity.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "RoleEntity was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete RoleEntity with id=${id}. Maybe RoleEntity was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete RoleEntity with id=" + id
            });
        });
};
