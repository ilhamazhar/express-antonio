import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  roleId: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

const userModel = mongoose.model('User', userSchema);

// User Action
const countUsers = () => userModel.count();
const getUsers = () => userModel.find();
const getUserByEmail = (email: string) => userModel.findOne({ email });
const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({ 'authentication.sessionToken': sessionToken });
const getUserById = (id: string) => userModel.findById(id);
const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());
const updateUserById = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values, { new: true });
const deleteUserById = (id: string) => userModel.findOneAndDelete({ _id: id });

export {
  countUsers,
  getUsers,
  getUserByEmail,
  getUserBySessionToken,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
