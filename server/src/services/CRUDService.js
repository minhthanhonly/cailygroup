import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      let groupname = "";
      if (data.group == 1) {
        groupname = "Chung";
      }
      if (data.group == 2) {
        groupname = "WEB";
      }
      if (data.group == 3) {
        groupname = "Thiết bị A";
      }
      if (data.group == 4) {
        groupname = "Thiết kế";
      }
      await db.User.create({
        userid: data.userid,
        password: hashPasswordFromBcrypt,
        password_default: hashPasswordFromBcrypt,
        realname: data.realname,
        user_group: data.group,
        user_groupname: groupname,
        authority: data.authority,
        owner: data.userid,
      });
      resolve("ok create a new user!");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });

      // Kiểm tra xem user có tồn tại hay không
      if (!user) {
        return resolve(); // hoặc reject("User not found");
      }
      let groupname = "";
      if (data.group == 1) {
        groupname = "Chung";
      }
      if (data.group == 2) {
        groupname = "WEB";
      }
      if (data.group == 3) {
        groupname = "Thiết bị A";
      }
      if (data.group == 4) {
        groupname = "Thiết kế";
      }
      // Cập nhật thông tin người dùng
      if (data.password) {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        user.password = hashPasswordFromBcrypt;
      }
      user.userid = data.userid;
      user.realname = data.realname;
      user.user_group = data.group;
      user.user_groupname = groupname;
      user.authority = data.authority;

      await user.save();

      let allUsers = await db.User.findAll();
      resolve(allUsers);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let deleteUserByID = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let createNewGroup = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Groups.create({
        id: data.id,
        group_name: data.group_name,
        add_level: 0,
        owner: "admin",
      });
      resolve("ok create a new group!");
    } catch (e) {
      reject(e);
    }
  });
};
let getAllGroup = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let group = db.Groups.findAll({
        raw: true,
      });
      resolve(group);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  deleteUserByID: deleteUserByID,

  createNewGroup: createNewGroup,
  getAllGroup: getAllGroup,
};
