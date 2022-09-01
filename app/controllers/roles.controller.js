const db = require("../models");
const Roles = db.roles;
const CoreMenuItem = db.coreMenuItem;
const Role_menu = db.role_menu;
const RbacEntityFunction = db.rbacEntityFunction;
const RoleEntity = db.roleEntity;

const DataLoader = require('../config/core/dataloader')


exports.create = async (req, res) => {
    // Save Roles in the database
    Roles.create(req.body)
        .then(async data => {

            let perm = await RbacEntityFunction.findAll()

            for (let i = 0, l = perm.length; i < l; i++) {

               await RoleEntity.create({
                    roleId: data.id,
                    permissionId: perm[i].id,
                    path: perm[i].path,
                    action: perm[i].action,
                    entity:perm[i].entity,
                    value: perm[i].value,
                    description: perm[i].description,
                    actionName: perm[i].actionName,
                    entityName: perm[i].entityName,
                    actionType: perm[i].actionType,
                    canView: perm[i].canView,
                    updatedBy: data.updatedBy,
                    createdBy: data.createdBy
                })

            }
            let permMenu = await CoreMenuItem.findAll()

            for (let p = 0, l = permMenu.length; p < l; p++) {

                Role_menu.create({
                    roleId: data.id,
                    menuId: permMenu[p].id,
                    menuIdParenId: permMenu[p].parentId,
                    menuIdType: permMenu[p].type,
                    menuName: permMenu[p].title,
                    view: false,
                    updatedBy: data.updatedBy,
                    createdBy: data.createdBy
                })

            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Roles."
            });
        });
};
exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('roles', req.query)
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

    Roles.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Roles with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Roles.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Roles was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Roles with id=${id}. Maybe Roles was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Roles with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Roles.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Roles was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Roles with id=${id}. Maybe Roles was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Roles with id=" + id
            });
        });
};
