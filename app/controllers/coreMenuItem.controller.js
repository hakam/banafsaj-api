const db = require("../models");
const CoreMenuItem = db.coreMenuItem;
const DataLoader = require('../config/core/dataloader')
const { QueryTypes } = require('sequelize');
const Role_menu = db.role_menu;
const { Op } = require("sequelize");


exports.create = (req, res) => {
    // Save CoreMenuItem in the database
    CoreMenuItem.create(req.body)
        .then(async data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the CoreMenuItem."
            });
        });
};
exports.findAllView = async (req, res) => {

    try {
        const dataLoader = new DataLoader('coreMenuItem', req.query)
        const result = await dataLoader.load()
        const nest = (items, id = null, link = 'parentId') =>
            items
                .filter(item => item[link] === id)
                .map(item => ({ ...item, children: nest(items, item.id) }));
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
exports.findAllList = async (req, res) => {

    try {
        const dataLoader = new DataLoader('coreMenuItem', req.query)
        const result = await dataLoader.load()
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }

};
exports.findMenu = async (req, res) => {
     if(req.user && req.user.roleId){
        try {
            await Role_menu.findAll({ attributes: ['menuId'], where: { roleId: req.user.roleId, view: 1 }, raw: true }).then(async data => {
                let menuIds = []
                for (let index = 0; index < data.length; index++) {
                    let item = data[index]
                    menuIds.push(item.menuId)
                }
                await CoreMenuItem.findAll({ where: { id: menuIds }, raw: true }).then(async menuData => {
                    const nest = (items, id = null, link = 'parentId') =>
                        items
                            .filter(item => item[link] === id)
                            .map(item => ({ ...item, children: nest(items, item.id) }));
                    const treeData = await nest(menuData)
                    res.json(treeData)
                });
            });
        } catch (error) {
            res.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving Transactionss."
            });
        }
     }else{
        return res.sendStatus(403);
     }
  

};
exports.findOne = (req, res) => {
    const id = req.params.id;

    CoreMenuItem.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving CoreMenuItem with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    CoreMenuItem.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "CoreMenuItem was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update CoreMenuItem with id=${id}. Maybe CoreMenuItem was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating CoreMenuItem with id=" + id
            });
        });
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    CoreMenuItem.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(async num => {

            if (num[0] == 1) {
                res.send({
                    message: "CoreMenuItem was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete CoreMenuItem with id=${id}. Maybe CoreMenuItem was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete CoreMenuItem with id=" + id
            });
        });
};


