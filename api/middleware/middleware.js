const Users = require('../users/users-model');


function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(` req method: '${req.method}' \n req url: '${req.url}' \n time: [${time}]`);
  next();
}

const validateUserId = async (req, res, next) => {
  const {id} = req.params;
  const user = await Users.getById(id);
  user 
    ? (req.user = user, next()) 
    : res.status(404).json({ message: "user not found" })
}

function validateUser(req, res, next) {
  const checkUserUpdate = req.body;
  checkUserUpdate.name 
    ? next()
    : res.status(400).json({message: "missing required name field"})
}

function validatePost(req, res, next) {
  const checkPostCreate = req.body;
  checkPostCreate.text
    ? next()
    : res.status(400).json({ message: "missing required text field" })
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
// do not forget to expose these functions to other modules
