import db from "../models/index"
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
}

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
          attributes: ['email', 'roleId', 'password'],
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = 'Ok';
            console.log(user);
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = 'Wrong pass word';
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found~`
        }
      } else {
        // return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in our system. Pls try again!!!`;
        // resolve(userData); Chuyển ra ngoài để check một lượt
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  })
}


let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Hàm findOne nếu không tìm được kết quả thì trả về undefine
      let user = await db.User.findOne({
        where: { email: userEmail }
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e)
    }
  })
}

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = '';
      if (userId === 'ALL') {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"]
          },
          raw: true,
        })
      }
      if (userId && userId !== 'ALL') {
        users = await db.User.findOne({
          attributes: {
            exclude: ["password"]
          },
          where: { id: userId },
          raw: true,
        })
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  })
}

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // kiểm tra email có tồn tại trong data base hay kh
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already exist, pls create new email!"
        })
      } else {
        let hashPasswordFromBrcypt = await hashUserPassword(data.password)
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBrcypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === '1' ? true : false,
          roleId: data.roleId,
        })
        resolve({
          errCode: 0,
          message: "Create user have been succeed"
        });
      }

    } catch (e) {
      reject(e);
    }
  })
}

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId }
      })
      if (!user) {
        resolve({
          errCode: 2,
          message: "the user isn't exists in our system"
        })
      }
      await db.User.destroy({
        where: {
          id: userId
        },
      });
      resolve({
        errCode: 0,
        message: "A user have been remove the system"
      })
    } catch (e) {
      reject(e)
    }
  })
}

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required paramaters"
        })
      }
      let user = await db.User.findOne({
        where: { id: data.id }, raw: false
      })
      if (!user) {
        resolve({
          errCode: 1,
          errMessage: "User isn't exists in database!!!"
        })
      }
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();
      resolve({
        errCode: 0,
        errMessage: "Update a user have been succeed"
      })
    } catch (e) {
      reject(e);
    }
  })
}

let getAllCodesService = (inputType) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputType) {
        resolve({
          errCode: 1,
          errMessage: "Missing required Parameter !!!"
        })
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: {
            type: inputType
          }
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAllCodesService: getAllCodesService,
}