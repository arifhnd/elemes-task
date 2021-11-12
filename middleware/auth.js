const Helpers = require('./../utils/Helpers')

module.exports = {
	checkAuth: async (req, res, next) => {
		let response = {}
		try{
			if(!req.headers.authorization){
                response = await Helpers.Response(403, "Forbidden", new Date().toISOString(), null, null)   
		        return res.send(response)
		    }

		    var token = req.headers.authorization.split(' ')[1];
		    if(token){
		    	const verify = Helpers.verifyJwt(token);
		    	if(verify){
		    		next()
		    	}else{
		    		response = await Helpers.Response(403, "Forbidden", new Date().toISOString(), null, null)   
			        return res.status(403).send(response)
		    	}
		    }else{
		    	response = await Helpers.Response(403, "Forbidden", new Date().toISOString(), null, null)   
		        return res.status(403).send(response)
		    }

		}catch(err){
			throw err
		}
	}
}