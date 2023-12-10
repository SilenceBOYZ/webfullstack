import userService from "../services/userServices"

// Api là một phương thức để giao tiếp giữa server và server
// Khi req đến một API thì chỉ trả kết qua là một khối Data (một object)
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json(
      {
        errCode: 1,
        message: "Mising inputs parameter"
      }
    )
  }
  let userData = await userService.handleUserLogin(email, password);
  // check email exist 
  // compare password
  // return userInfor
  // access_token:JWT
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {}
  });
}


let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; // Lấy tất cả người dùng hoặc một 
  if(!id) {
    return res.status(200).json({
      errCode: 1,   
      errMessage: "Missing required paramater",
      users: []
    })
  }
  
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,   
    errMessage: "Ok",
    users
  })
  
}


module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
}