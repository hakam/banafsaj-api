const db = require("../models");
const Role_menu = db.role_menu;
const DataLoader = require('../config/core/dataloader')


exports.create = (req, res) => {
    // Save Role_menu in the database
    Role_menu.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Role_menu."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('role_menu', req.query)
        const result = await dataLoader.load()
        const nest = (items, menuId = null, link = 'menuIdParenId') =>
            items.filter(item => item[link] === menuId).map(item => ({ ...item, children: nest(items, item.menuId) }));
        const treeData = await nest(result.data)
        result.data = treeData
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

    Role_menu.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Role_menu with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Role_menu.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Role_menu was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Role_menu with id=${id}. Maybe Role_menu was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Role_menu with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Role_menu.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Role_menu was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Role_menu with id=${id}. Maybe Role_menu was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Role_menu with id=" + id
            });
        });
};

exports.findAllList = async (req, res) => {

    try {
        const dataLoader = new DataLoader('role_menu', req.query)
        const result = await dataLoader.load()
      
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }
};