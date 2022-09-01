const db = require("../models");
const { Op } = require("sequelize");

const RoleEntity = db.roleEntity;

const reqPerm = async (req, res, next) => {

    let originalLink = req.originalUrl
    originalLink = originalLink.substring(0, originalLink.indexOf('?'));
    const fullUrl = originalLink.split("/")
    const createdByObject = { "createdBy": req.user.id }
    const updatedByObject = { "updatedBy": req.user.id }
    switch (req.method) {
        case "POST":
            console.log("POST");
            let allPOSTData = Object.assign(req.body, createdByObject, updatedByObject);
            req.body = allPOSTData
           
            break;
        case "PUT":
            let allPUTData = Object.assign(req.body, updatedByObject);
            req.body = allPUTData
           
            break;
    }



    // if (fullUrl.length == 3) {
    //     console.log(req.originalUrl);
    //     const role = await RoleEntity.findOne({
    //         where: {
    //             path: {
    //                 [Op.like]: '/' + fullUrl[1] + '/' + fullUrl[2]
    //             },
    //             action: req.method,
    //             roleId: req.user.roleId
    //         }, raw: true
    //     });
    //     if (role && role.value == 100 || role == null) {
    //         console.log("for");
    //         return res.status(403).send({ message: 'Your account is not authorized to access the requested resource.' })
    //     }
    // }
    // if (fullUrl.length == 4) {
    //     if (!isNaN(+fullUrl[3])) {
    //         const role = await RoleEntity.findOne({
    //             where: {
    //                 path: {
    //                     [Op.like]: '/' + fullUrl[1] + '/' + fullUrl[2] + '/:id'
    //                 },
    //                 action: req.method
    //             }, raw: true
    //         });
    //         if (role && role.value == 100 || role == null) {
    //             return res.status(403).send({ message: 'Your account is not authorized to access the requested resource.' })
    //         }
    //     }
    //     if (isNaN(+fullUrl[3])) {
    //         const role = await RoleEntity.findOne({
    //             where: {
    //                 path: {
    //                     [Op.like]: '/' + fullUrl[1] + '/' + fullUrl[2] + '/' + fullUrl[3]
    //                 },
    //                 action: req.method
    //             }, raw: true
    //         });
    //         if (role && role.value == 100 || role == null) {
    //             return res.status(403).send({ message: 'Your account is not authorized to access the requested resource.' })
    //         }
    //     }
    // }
    // if (fullUrl.length == 5) {
    //     if (!isNaN(+fullUrl[4])) {
    //         const role = await RoleEntity.findOne({
    //             where: {
    //                 path: {
    //                     [Op.like]: '/' + fullUrl[1] + '/' + fullUrl[2] + '/' + fullUrl[3] + '/:id'
    //                 },
    //                 action: req.method
    //             }, raw: true
    //         });
    //         if (role && role.value == 100 || role == null) {
    //             return res.status(403).send({ message: 'Your account is not authorized to access the requested resource.' })
    //         }
    //     }
    //     if (isNaN(+fullUrl[4])) {
    //         const role = await RoleEntity.findOne({
    //             where: {
    //                 path: {
    //                     [Op.like]: '/' + fullUrl[1] + '/' + fullUrl[2] + '/' + fullUrl[3] + '/' + fullUrl[4]
    //                 },
    //                 action: req.method
    //             }, raw: true
    //         });
    //         if (role && role.value == 100 || role == null) {
    //             return res.status(403).send({ message: 'Your account is not authorized to access the requested resource.' })
    //         }
    //     }
    // }
    next();
};
module.exports = reqPerm;