module.exports = function(req, res, next){
	//if (!req.isAuthenticated()) res.send(401); else next();
	next();
}