const mongoose = require('../services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum : ['Female','Male', 'Unknown'],
      default: 'Unknown',
    }
  });

const userModel = mongoose.model('User', userSchema);

exports.createUser = (userData) => {
  const user = new userModel(userData);
  return user.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    userModel.find()
          .limit(perPage)
          .skip(perPage * page)
          .exec(function (err, users) {
              if (err) {
                  reject(err);
              } else {
                  resolve(users);
              }
          })
  });
};

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
      userModel.deleteMany({_id: userId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};

exports.findById = (userId) => {
  return userModel.findById(userId)
      .then((result) => {
          result = result.toJSON();
          delete result._id;
          delete result.__v;
          return result;
      });
};

exports.patchUser = (userId, userData) => {
  return userModel.findOneAndUpdate({
      _id: userId
  }, userData);
};