const { User } = require("../models");
const { jwtSign } = require("../helper/jwt");
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");
const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customErrors");

function validadeSigUpData(userData){

    if (!userData.username || userData.username.trim().length == 0) 
      throw new FieldRequiredError(`A username`);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailRegex.test(userData.email)) 
      throw new FieldRequiredError(`An email`);
    
    if (!userData.password || userData.password.trim().length == 0) 
      throw new FieldRequiredError(`A password`);
}

// Register
const signUp = async (req, res, next) => {
  try {
    
    const { user } = req.body;
    validadeSigUpData( user );
    
    const userExists = await User.findOne({ where: { email: user.email } });
    if (userExists) 
      throw new AlreadyTakenError("Email", "try logging in");

    const newUser = await User.create({...user,
      password: await bcryptHash(user.password),
    });
    newUser.dataValues.token = await jwtSign(newUser);
    
    res.status(201).json({ user: newUser });
  }
  catch (error) {
    next(error);
  }
};

// Login
const signIn = async (req, res, next) => {
  try {
    
    const user  = req.body.user;
    
    const existentUser = await User.findOne({ where: { email: user.email } });
    if (!existentUser) 
      throw new NotFoundError("Email", "sign in first");

    const pwd = await bcryptCompare(user.password, existentUser.password);
    if (!pwd) 
      throw new ValidationError("Wrong email/password combination");

    existentUser.dataValues.token = await jwtSign(user);

    res.json({ user: existentUser });
  } 
  catch (error) {
    next(error);
  }
};


//Unregister
const signDown = async (req, res, next) => {

  try {

    const user = req.loggedUser;
    const rowCount = await User.destroy({
      where: { email: user.email },
    });
    if (rowCount == 0) 
      throw new NotFoundError("Email", "Not Found");
    
    res.status(201);
  } 
  catch (error) {
    next(error);
  }
};

module.exports = { signUp, signDown, signIn };
