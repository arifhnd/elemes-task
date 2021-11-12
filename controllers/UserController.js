const Helpers = require("../utils/Helpers")
const UserDao = require("../dao/UserDao")

module.exports = {
    getAll: async (req, res, next) => {
        let response = {}
        try {
            /**
             * Doing query to get all courses
             */
             let user_id = await UserDao.getUserId(req);
             let user = await UserDao.findById(user_id);
            //  Checking role of user
            if(user.role !== "admin"){
                 response = await Helpers.Response(403, "Forbidden, Only Administrator That Can Access This Feature", new Date().toISOString(), null, null)   
                 return res.status(403).send(response)
            }

            let count = await UserDao.count(req.query["column"], req.query["order"], req.query["limit"], req.query["page"], req.query["keyword"])
            let data = await UserDao.find(req.query["column"], req.query["order"], req.query["limit"], req.query["page"], req.query["keyword"])
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

    delete: async (req, res, next) => {
        let response = {}
        try {
            let user_id = await UserDao.getUserId(req)
            let user = await UserDao.findById(user_id);
            // Checking role of user
            if(user.role !== "admin"){
                response = await Helpers.Response(403, "Forbidden, Only Administrator That Can Access This Feature", new Date().toISOString(), null, null)   
			    return res.status(403).send(response)
            }

            // Checking deleted user is themselves
            if(user_id == req.params.id){
                response = await Helpers.Response(403, "Forbidden, You Can't Delete Your Self", new Date().toISOString(), null, null)   
			    return res.status(403).send(response)
            }

            let data = await UserDao.delete(req.params.id, user_id)
            if(data){
                response = await Helpers.Response(200, "success", new Date().toISOString(), null, data)
            }else{
                response = await Helpers.Response(500, "Failed Deleting user", new Date().toISOString(), null, data)
            }
            return res.send(response)
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.send(response);
        }
    }
}