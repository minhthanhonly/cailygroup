import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (user, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserId(user);
      if (isExist) {
        let users = await db.User.findOne({
          attributes: [
            "userid",
            "password",
            "user_group",
            "user_groupname",
            "authority",
          ],
          where: { userid: user },
          raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(pass, users.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            delete users.password;
            userData.user = users;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Mật khẩu không chính xác!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `không tìm thấy tài khoản này!`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Tài khoản của bạn không tồn tại!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { userid: userId },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
};
