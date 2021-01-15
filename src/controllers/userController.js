import User from "../models/User";
import Role from "../models/Role";
import {messageOut,messageErrorCatch} from '../libs/helper';

const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    if(!savedUser) return res.status(400).json(messageOut(1,'Error al crear usuario, Reintente'));


    return res.status(200).json(messageOut(0,'Usuario creado correctamente',{
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles,
      })
    );
  } catch (error) {
    messageErrorCatch(error,res,'createUser');
  }
};

const getUsers = async (req, res) => {
  try {
    let arrayUser = [];
    const users = await User.find().populate("roles");

    if(!users) return res.status(400).json(messageOut(1,'Error al obtener usuarios, Reintente'));

    users.forEach(e => {
      arrayUser.push({ 
        _id: e._id,
        username: e.username,
        email: e.email,
        createdAt: e.createdAt,
        updatedAt: e.createdAt,
        roles: e.roles
      })
      
    });

    res.json(messageOut(0,'Ok',arrayUser));

  } catch (error) {
    messageErrorCatch(error,res,'getUsers');
  }
};


const getUserByIdEmailUsername = async (req, res) => {
  try {
    let userFound = "";
    let arrayUser = [];

    let keyObject = Object.keys(req.body);
    
    console.log(validateGetUserByIdEmailUsername(keyObject))
    if(validateGetUserByIdEmailUsername(keyObject) === 1) return res.status(400).json(messageOut(1,'parametro enviado incompatible, reintente'));
    

    if(req.body.username || req.body.email) {
      userFound = await User.find({ $or: [ { username: req.body.username}, { email: req.body.email}] });
    } else if (req.body.id) {
      userFound = await User.findById(req.body.username.id);
    }

    if(!userFound || userFound.length === 0) return res.status(400).json(messageOut(1,'Usuario no encontrado'));

    userFound.forEach(e => {
      arrayUser.push({ 
        _id: e._id,
        username: e.username,
        email: e.email,
        createdAt: e.createdAt,
        updatedAt: e.createdAt,
        roles: e.roles
      })
      
    });
    res.status(200).json(messageOut(0,'Usuario encontrado',arrayUser));
    
  } catch (error) {
    console.log(error)
    messageErrorCatch(error,res,'getUsers');
  }
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};


const validateGetUserByIdEmailUsername = (param) => {
  let keyObject = Object.keys(param);
  let arrayOpcionParams = ['username','email','id'];
  if(keyObject.length > 1) return 1;
  if(keyObject.length <= 0) return;

  //if(!arrayOpcionParams.includes(keyObject)) return 1;
  for (let i = 0; i < keyObject.length; i++) {
    if(arrayOpcionParams.includes(keyObject[i])){
        return 1;
    } 
  } 

  return;

}

module.exports = {
    createUser,
    getUsers,
    getUserByIdEmailUsername
}