import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let userId = req.body.userid;
  let password = req.body.password;
  if (!userId || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Hãy nhập đủ tên và mật khẩu!",
    });
  }

  let userData = await userService.handleUserLogin(userId, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

module.exports = {
  handleLogin: handleLogin,
};
