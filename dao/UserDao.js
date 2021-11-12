const Model = require("./../models/index")
const Helpers = require("./../utils/helpers")

module.exports = {
    find: async (column, order, limit, page, keyword) => {
        try {
            let condition = {}
            let offset = 0
            if (page > 1) offset = ((page-1) * limit)
            if (!limit) limit = 10
            if (!column) column = "updatedAt"
            if (!order) order = "desc"

            condition = {
                where: {
                    [Model.Sequelize.Op.or]: {
                        email: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                        name: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                        role: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                    },
                    role: "member",
                    isDelete: 0
                },
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [
                    [column, order]
                ]
            }

            let data = await Model.user.findAll(condition)
            return data
        } catch (e) {
            throw e
        }
    },

    count: async (column, order, limit, page, keyword) => {
        try {
            let condition = {}
            let offset = 0
            if (page > 1) offset = ((page-1) * limit)
            if (!limit) limit = 10
            if (!column) column = "updatedAt"
            if (!order) order = "desc"

            condition = {
                where: {
                    [Model.Sequelize.Op.or]: {
                        email: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                        name: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                        role: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                    },
                    role: "member",
                    isDelete: 0
                },
                order: [
                    [column, order]
                ]
            }
            let data = await Model.user.count(condition)
            return data
        } catch (e) {
            throw e
        }
    },

    login: async (email, password) => {
        try {
            let condition = {
                attributes: {
                    exclude: ["password", "createdBy", "updatedBy","createdAt","updatedAt","isDelete"]
                },
                where: {
                    email: email,
                    password: password,
                    isDelete: 0
                }
            }
            return await Model.user.findOne(condition)
        } catch (err) {
            throw err
        }
    },
    
    add: async (req, user_id) => {
        try {
            let obj = {
                name: req.body['name'],
                email: req.body['email'],
                password: await Helpers.HashPassword(req.body["password"]),
                role: "member",
                createdBy: user_id
            }
            return await Model.user.create(obj)
        } catch (e) {
            console.log(e)
            return e
        }
    },

    findById: async (id) => {
        try {
            return await Model.user.findByPk(id)
        } catch (e) {
            console.log(e)
            return false
        }
    },

    findByUsername: async (email) => {
        try {
            return await Model.user.findOne({where: {email: email}})
        } catch (e) {
            console.log(e)
            return false
        }
    },

    getUserId: async (req) => {
        try{
            const bearerHeader = req.headers['authorization'];
            const token = bearerHeader.split(' ')[1];
            const user = await Helpers.verifyJwt(token);
            if(!user){
                return false
            }else{
                return await user.user_id
            }
        } catch(err){
            throw err
        }
    },

    delete: async (id, user_id) => {
        try {
            let obj = {
                isDelete: 1,
                updatedBy: user_id
            }
            return await Model.user.update(obj, {where: {id: id}})
        } catch (e) {
            console.log(e)
            return false
        }
    }
}