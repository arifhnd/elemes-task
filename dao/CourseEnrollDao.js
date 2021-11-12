const Model = require("./../models/index")

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

            let data = await Model.course_enroll.findAll(condition)
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

            let data = await Model.course_enroll.count(condition)
            return data
        } catch (e) {
            throw e
        }
    },

    getById: async (id) => {
        try {
            return await Model.course.findByPk(id)
        } catch (e) {
            return false;
        }
    },

    getByCourseIdAndUserId: async (courseId, userId) => {
        try {
            return await Model.course_enroll.findOne({
                where: {
                    course_id: courseId,
                    user_id: userId
                }
            })
        } catch (e) {
            console.log(e)
            return false;
        }
    },

    add: async (course_id, user_id) => {
        try {
            let obj = {
                user_id: user_id,
                course_id: course_id,
                createdBy: user_id
            }
            
            return await Model.course_enroll.create(obj)
        } catch (e) {
            console.log(e)
            return false;
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