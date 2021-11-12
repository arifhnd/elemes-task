const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
    generateRequestId: () => {
        var todayDate = new Date().toISOString().slice(0, 19).replace(/-/g,"")
        var cleanDate = todayDate.replace(/:/g, "")
        var number = Math.floor(Math.random() * 99999)
        var requestId = cleanDate.toString() + number.toString()
        return requestId
    },

    HashPassword: async (password) => {
        return CryptoJS.HmacSHA256(password, process.env.SALT).toString()
    },

    Response: async (code, message, timestamp, error) => {
        return {
            "response_code": code,
            "response_message": message,
            "response_timestamp": timestamp.replace("Z","+00.00"),
            "error": error
        }
    },

    ResponseWithData: async (code, message, timestamp, error, data) => {
        return {
            "response_code": code,
            "response_message": message,
            "response_data": data,
            "response_timestamp": timestamp.replace("Z","+00.00"),
            "error": error
        }
    },

    ResponseLogin: async (code, message, timestamp, error, dataResponse) => {
        return {
            "response_code": code,
            "response_message": message,
            "response_data": dataResponse,
            "response_timestamp": timestamp.replace("Z","+00.00"),
            "error": error
        }
    },

    ResponseWithPagination: async (code, message, timestamp, error, page, maxPage, limit, totalData, keyword, order, column, data) => {
        return {
            "response_code": code,
            "response_message": message,
            "response_timestamp": timestamp.replace("Z","+00.00"),
            "error": error,
            "page": page || 1,
            "totalPage": maxPage || 0,
            "totalData": totalData,
            "limit": limit || 10,
            "keyword": keyword || '',
            "order": order || 'desc',
            "column": column || 'updatedAt',
            "data": data
        }
    },

    generateJwt: (payload) => {
        let token = jwt.sign({user_id: payload.id, username: payload.username}, process.env.KEY_SECRET, {
            expiresIn: '1d'
        });

        return token
    },

    verifyJwt: async (token) => {
        let result = false
        jwt.verify(token, process.env.KEY_SECRET, async (error, data) => {
            if(error){
                return false;
            }
            result = data;
        });

        return result
    },

    captureException: (err) => {
        Sentry.captureException(err);
    },

    atob: async(data) => {
        return Buffer.from(data).toString('base64')
    },

    btoa: async(data) => {
        return Buffer.from(data, 'base64').toString('ascii')
    },

};