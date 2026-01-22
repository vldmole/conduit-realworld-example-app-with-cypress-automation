const { UnauthorizedError } = require("../helper/customErrors");
const { bcryptHash } = require("../helper/bcrypt");
const { User } = require("../models");

//* Current User
const currentUser = async (req, res, next) => {
  try {
  
    const loggedUser = req.loggedUser;
    if (!loggedUser) 
      throw new UnauthorizedError();

    const user = await User.findOne({
      where: { email: loggedUser.email },
    });

    res.status(200).json({ user: user });
  } 
  catch (error) {
    next(error);
  }
};

//* Update User
const updateUser = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const {
      user: { password },
      user,
    } = req.body;

    Object.entries(user).forEach((entry) => {
      const [key, value] = entry;

      if (value !== undefined && key !== "password") loggedUser[key] = value;
    });

    if (password !== undefined || password !== "") {
      loggedUser.password = await bcryptHash(password);
    }

    await loggedUser.save();

    res.json({ user: loggedUser });
  } catch (error) {
    next(error);
  }
};

//unregister
const deleteUser = async (req, res, next) => {

  try {
    const user = req.body.user;
    const rowCount = await User.destroy({
      where: { email: user.email },
    });
    if (rowCount == 0) 
      throw new NotFoundError("Email", "Not Found");
    
    res.status(204).json(user);
  } 
  catch (error) {
    next(error);
  }
};


module.exports = { currentUser, updateUser, deleteUser };
