const Helpers = require('../utils/Helpers');
const UserDao = require('../dao/UserDao');
const validator = require('validator');

module.exports = {
    register: async (req, res, next) => {
        let response = {};
        try {
            let msg = [];
            if (!req.body.name) msg.push({ name: "name", message: "required" });
            if (!req.body.email) msg.push({ name: "email", message: "required" });
            if (!req.body.password) msg.push({ name: "password", message: "required" });
            if (!validator.isEmail(req.body.email)) msg.push({ name: "email", message: "your email is not an email format" });

            if (msg.length > 0) {
                response = await Helpers.Response(400, msg, new Date().toISOString(), null);
                return res.status(400).json(response);
            }

            const user = await UserDao.findByUsername(req.body.email);
            if (user) {
                response = await Helpers.Response(400, "User already exists", new Date().toISOString(), null, null)                
                return res.status(400).json(response);
            }
            const newUser = await UserDao.add(req);
            if(newUser) {
                response = await Helpers.ResponseWithData(200, "success registering user", new Date().toISOString(), null, newUser)
            }else{
                response = await Helpers.Response(500, "error registering user", new Date().toISOString(), null, null)
            }
            return res.send(response);
        } catch (err) {
            response = await Helpers.Response(500, err.message, new Date().toISOString(), null, null)
            return res.status(500).json(response);
        }
    },

    login: async (req, res, next) => {
        let response = {};
        try {
          let msg = [];
          if (!req.body.email) msg.push({ name: "email", message: "required" });
          if (!req.body.password) msg.push({ name: "password", message: "required" });

          if (msg.length > 0) {
              response = await Helpers.Response(400, msg, new Date().toISOString(), null);
              return res.status(400).json(response);
          }

          let email = req.body["email"];
          let password = await Helpers.HashPassword(req.body["password"]);
          let role;
          let doLogin = await UserDao.login(email, password);
          if (doLogin) {
    
            let token = Helpers.generateJwt(doLogin);
            let dataResponse = { email, token, role };
            
            response = await Helpers.ResponseLogin(
              200,
              "success",
              new Date().toISOString(),
              null,
              dataResponse
            );

            return res.status(200).json(response);
          } else {
            response = await Helpers.ResponseLogin(
              401,
              "email / password invalid!",
              new Date().toISOString(),
              null,
              null
            );
            return res.status(401).json(response);
          }
    
        } catch (err) {
          let response = await Helpers.Response(
            500,
            err.message,
            new Date().toISOString(),
            null,
            null
          );
          return res.status(500).json(response);
        }
      },
}