import db from "../models/index"
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: {email:email},
          raw: true,
          attributes: ['email','roleId', 'password'],
        });
        if(user) {
          let check = await bcrypt.compareSync(password, user.password);
          if(check) {
            userData.errCode = 0;
            userData.errMessage= 'Ok';
            console.log(user);
            delete user.password;
            userData.user = user;
          }else {
            userData.errCode = 3;
            userData.errMessage = 'Wrong pass word';
          }
        }else {
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

module.exports = {
  handleUserLogin: handleUserLogin
}