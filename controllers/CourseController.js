const Helpers = require("../utils/Helpers")
const CourseDao = require("../dao/CourseDao")
const CourseEnrollDao = require("../dao/CourseEnrollDao")
const UserDao = require("../dao/UserDao")

module.exports = {
    getAll: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to get all courses
             */
            let count = await CourseDao.count(req.query["column"], req.query["order"], req.query["limit"], req.query["page"], req.query["keyword"], req.query["sortBy"])
            let data = await CourseDao.find(req.query["column"], req.query["order"], req.query["limit"], req.query["page"], req.query["keyword"], req.query["sortBy"])
            response = await Helpers.ResponseWithPagination(
                200, 
                "success", 
                new Date().toISOString(), 
                null, 
                req.query["page"],
                Math.ceil(count / parseInt(req.query["limit"] || 10)),
                req.query["limit"],
                count,
                req.query["keyword"],
                req.query["order"],
                req.query["column"],
                data
            )

            return res.send(response)
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.send(response);
        }
    },

    getAllFree: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to get all free courses
             */
            let count = await CourseDao.countFree(req.query["column"], req.query["order"], req.query["limit"], req.query["page"], req.query["keyword"])
            let data = await CourseDao.findFree(req.query["column"], req.query["order"], req.query["limit"], req.query["page"], req.query["keyword"])
            response = await Helpers.ResponseWithPagination(
                200, 
                "success", 
                new Date().toISOString(), 
                null, 
                req.query["page"],
                Math.ceil(count / parseInt(req.query["limit"] || 10)),
                req.query["limit"],
                count,
                req.query["keyword"],
                req.query["order"],
                req.query["column"],
                data
            )

            return res.send(response)
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.send(response);
        }
    },

    getAllPopular: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to get all free courses
             */
            let count = await CourseDao.countPopular(req.query["column"], req.query["order"], req.query["limit"], req.query["page"], req.query["keyword"])
            let data = await CourseDao.findPopular(req.query["column"], req.query["order"], req.query["limit"], req.query["page"], req.query["keyword"])
            response = await Helpers.ResponseWithPagination(
                200, 
                "success", 
                new Date().toISOString(), 
                null, 
                req.query["page"],
                Math.ceil(count / parseInt(req.query["limit"] || 10)),
                req.query["limit"],
                count,
                req.query["keyword"],
                req.query["order"],
                req.query["column"],
                data
            )

            return res.send(response)
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.send(response);
        }
    },

    add: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to add course
             */
            let user_id = await UserDao.getUserId(req);
            let user = await UserDao.findById(user_id);
            //  Checking role of user
            if(user.role !== "admin"){
                 response = await Helpers.Response(403, "Forbidden, Only Administrator That Can Access This Feature", new Date().toISOString(), null, null)   
                 return res.status(403).send(response)
            }
            let data = await CourseDao.add(req, user_id)
            if(data){
                response = await Helpers.ResponseWithData(200, "success", new Date().toISOString(), null, data)
            }else{
                response = await Helpers.Response(500, "failed adding course", new Date().toISOString(), null, data)                
            }
            return res.send(response);
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.send(response);
        }
    },

    getById: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to get course by id
             */
            let data = await CourseDao.getById(req.params.id)
            response = await Helpers.ResponseWithData(200, "success", new Date().toISOString(), null, data)
            return res.send(response)
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.send(response);
        }
    },

    update: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to update course
             */
            let user_id = await UserDao.getUserId(req);
            let user = await UserDao.findById(user_id);
            //  Checking role of user
            if(user.role !== "admin"){
                response = await Helpers.Response(403, "Forbidden, Only Administrator That Can Access This Feature", new Date().toISOString(), null, null)   
                return res.status(403).send(response)
            }
            let course = await CourseDao.getById(req.params.id)
            let data = await CourseDao.update(course, req, user_id)
            if(data){
                response = await Helpers.ResponseWithData(200, "success", new Date().toISOString(), null, data)
            }else{
                response = await Helpers.Response(500, "failed updating course", new Date().toISOString(), data, data)                
            }
            return res.send(response);
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, err)
            return res.send(response);
        }
    },

    delete: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to delete course
             */
            let user_id = await UserDao.getUserId(req);
            let user = await UserDao.findById(user_id);
            //  Checking role of user
            if(user.role !== "admin"){
                response = await Helpers.Response(403, "Forbidden, Only Administrator That Can Access This Feature", new Date().toISOString(), null, null)   
                return res.status(403).send(response)
            }
            let data = await CourseDao.delete(req.params.id, user_id)
            if(data){
                response = await Helpers.ResponseWithData(200, "success", new Date().toISOString(), null, data)
            }else{
                response = await Helpers.Response(500, "failed deleting course", new Date().toISOString(), null, data)                
            }
            return res.send(response);
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.send(response);
        }
    },

    enroll: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to enroll course
             */
            // Check is the course already enrolled
            let user_id = await UserDao.getUserId(req)
            let courseEnroll = await CourseEnrollDao.getByCourseIdAndUserId(req.params.id, user_id)
            if(courseEnroll){
                response = await Helpers.Response(400, "You have already enrolled this course", new Date().toISOString(), null, null)
                return res.status(500).json(response);
            }
            let data = await CourseEnrollDao.add(req.params.id, user_id)
            if(data){
                response = await Helpers.ResponseWithData(200, "success", new Date().toISOString(), null, data)
            }else{
                response = await Helpers.Response(500, "failed enrolling course", new Date().toISOString(), null, data)                
            }
            return res.send(response);
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.status(500).send(response);
        }
    },

    getStatistic: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to get statistic
             * Total user except admin
             */
            let data = {
                total_user: await UserDao.count(null, null, null, null, null),
                total_course: await CourseDao.count(null, null, null, null, null),
                total_freeCourse: await CourseDao.countFreeCourse(null, null, null, null, null),
            }
            response = await Helpers.ResponseWithData(200, "success", new Date().toISOString(), null, data)
            return res.send(response);
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.status(500).send(response);
        }
    }
}