const Model = require("./../models/index")
const cloudinary = require("cloudinary").v2

module.exports = {
    find: async (column, order, limit, page, keyword, sortBy) => {
        try {
            let condition = {}
            let offset = 0
            if (page > 1) offset = ((page-1) * limit)
            if (!limit) limit = 10
            if (!column) column = "updatedAt"
            if (!order) order = "desc"
            if(sortBy == "highPrice"){
                column = "price"
            }else if(sortBy == "lowPrice"){
                column = "price"
                order = "asc"
            }
            
            condition = {
                where: {
                    [Model.Sequelize.Op.or]: {
                        name: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}%`
                        },
                        author: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}%`
                        }
                    },
                    isDelete: 0
                },
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [
                    [column, order]
                ]
            }

            if(sortBy == "free"){
                condition.where.price = 0
            }

            let data = await Model.course.findAll(condition)
            return data
        } catch (e) {
            throw e
        }
    },

    count: async (column, order, limit, page, keyword, sortBy) => {
        try {
            let condition = {}
            let offset = 0
            if (page > 1) offset = ((page-1) * limit)
            if (!limit) limit = 10
            if (!column) column = "updatedAt"
            if (!order) order = "desc"

            if(sortBy == "highPrice"){
                column = "price"
            }else if(sortBy == "lowPrice"){
                column = "price"
                order = "asc"
            }

            condition = {
                where: {
                    [Model.Sequelize.Op.or]: {
                        name: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}%`
                        },
                        author: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}%`
                        }
                    },
                    isDelete: 0
                },
                order: [
                    [column, order]
                ]
            }

            if(sortBy == "free"){
                condition.where.price = 0
            }

            let data = await Model.course.count(condition)
            return data
        } catch (e) {
            throw e
        }
    },

    findFree: async (column, order, limit, page, keyword) => {
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
                        name: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                        author: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        }
                    },
                    price: 0,
                    isDelete: 0
                },
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [
                    [column, order]
                ]
            }

            let data = await Model.course.findAll(condition)
            return data
        } catch (e) {
            throw e
        }
    },

    countFree: async (column, order, limit, page, keyword) => {
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
                        name: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                        author: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        }
                    },
                    price: 0,
                    isDelete: 0
                },
                order: [
                    [column, order]
                ]
            }

            let data = await Model.course.count(condition)
            return data
        } catch (e) {
            throw e
        }
    },

    findPopular: async (column, order, limit, page, keyword) => {
        try {
            let condition = {}
            let offset = 0
            if (page > 1) offset = ((page-1) * limit)
            if (!limit) limit = 10
            column = "course_id"
            order = "desc"
            
            condition = {
                where: {
                    [Model.Sequelize.Op.or]: {
                        name: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                        author: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        }
                    },
                    isDelete: 0
                },
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [
                    [column, order]
                ]
            }

            return await Model.sequelize.query(
                `SELECT courses.author, courses.name, count(*) AS total_enrollment FROM course_enrolls LEFT JOIN courses ON course_enrolls.course_id = courses.id 
                WHERE courses.name LIKE "%${keyword || ""}%" AND courses.author LIKE "%${keyword || ""}%" 
                AND course_enrolls.isDelete = 0 GROUP BY ${column} HAVING COUNT(*) >= 5 ORDER BY count(*) ${order} LIMIT ${limit} OFFSET ${offset};`,
            { type: Model.sequelize.QueryTypes.SELECT }
            );
        } catch (e) {
            throw e
        }
    },

    countPopular: async (column, order, limit, page, keyword) => {
        try {
            let condition = {}
            let offset = 0
            if (page > 1) offset = ((page-1) * limit)
            if (!limit) limit = 10
            column = "course_id"
            order = "desc"

            condition = {
                where: {
                    [Model.Sequelize.Op.or]: {
                        name: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        },
                        author: {
                            [Model.Sequelize.Op.like]: `%${keyword || ''}`
                        }
                    },
                    isDelete: 0
                },
                order: [
                    [column, order]
                ]
            }
            let doQuery = await Model.sequelize.query(
                `SELECT courses.author, courses.name, count(*) AS total_enrollment FROM course_enrolls LEFT JOIN courses ON course_enrolls.course_id = courses.id 
                WHERE courses.name LIKE "%${keyword || ""}%" AND courses.author LIKE "%${keyword || ""}%" 
                AND course_enrolls.isDelete = 0 GROUP BY ${column} HAVING COUNT(*) >= 5 ORDER BY count(*) ${order} LIMIT ${limit} OFFSET ${offset};`,
            { type: Model.sequelize.QueryTypes.SELECT }
            );
            return doQuery.length;
        } catch (e) {
            throw e
        }
    },

    getById: async (id) => {
        try {
            return await Model.course.findByPk(id)
        } catch (e) {
            throw e
        }
    },

    add: async (req, user_id) => {
        try {
            cloudinary.config({ 
                cloud_name: 'ariefhnd', 
                api_key: '466556898555668', 
                api_secret: 'mbPm9tF0ia_jMop2xa5XtVq3UJs' 
            });
            let imageUrl = await cloudinary.uploader.upload(req.body.image);

            let obj = {
                author: req.body['author'],
                name: req.body['name'],
                description: req.body['description'],
                price: req.body['price'],
                image_url: imageUrl.url,
                createdBy: user_id
            }
            
            return await Model.course.create(obj)
        } catch (e) {
            return e
        }
    },

    update: async (data, req, user_id) => {
        try {
            cloudinary.config({ 
                cloud_name: 'ariefhnd', 
                api_key: '466556898555668', 
                api_secret: 'mbPm9tF0ia_jMop2xa5XtVq3UJs' 
            });
            let imageUrl = await cloudinary.uploader.upload(req.body.image);

            let obj = {
                author: req.body['author'] ? req.body['author'] : data.author,
                name: req.body['name'] ? req.body['name'] : data.name,
                price: req.body['price'] ? req.body['price'] : data.price,
                description: req.body['description'] ? req.body['description'] : data.description,
                image_url: req.body['image'] ? imageUrl.url : data.image_url,
                updatedBy: user_id,
                updatedAt: new Date()
            }

            return await data.update(obj)
        } catch (e) {
            console.log(e)
            return false
        }
    },
    delete: async (data, user_id) => {
        try {
            let obj = {
                updatedAt: new Date(),
                isDelete: 0,
                updatedBy: user_id
            }
            return await data.update(obj)
        } catch (e) {
            console.log(e)
            return false;
        }
    }
}