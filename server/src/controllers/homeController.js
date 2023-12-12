import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("about.ejs");
};

let getCRUD = async (req, res) => {
  let data = await CRUDService.getAllGroup();
  return res.render("crud.ejs", {
    dataTable: data,
  });
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  return res.send("Thêm mới người dùng thành công!");
  setTimeout(function () {
    window.location.href = "/display-crud";
  }, 200);
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("display-crud.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("edit-crud.ejs", {
      dataEdit: userData,
    });
  } else {
    return res.send("Users not find!");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  if (data.id === undefined || data.id === null) {
    return res.status(400).send("ID is missing or invalid");
  }
  let allUsers = await CRUDService.updateUser(data);
  return res.render("display-crud.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserByID(id);
    return res.send("Delete user cuccess!");
  } else {
    return res.send("User not find!");
  }
  // return res.send()
};

let createGroup = async (req, res) => {
  let mess = await CRUDService.createNewGroup(req.body);
  return res.send("Thêm mới nhóm thành công!");
  setTimeout(function () {
    window.location.href = "/display-group";
  }, 200);
};

let getGroup = (req, res) => {
  return res.render("group.ejs");
};

let displayGroup = async (req, res) => {
  let data = await CRUDService.getAllGroup();
  return res.render("display-group.ejs", {
    dataTable: data,
  });
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,

  createGroup: createGroup,
  getGroup: getGroup,
  displayGroup: displayGroup,
};
