const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels")

//@des User registration
//@route  POST /api/users
//@access public
const userRegistration = asyncHandler(async (req, res) => {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are Mandatory");
      }
      const avaliableUser = await User.findOne({ email });
      if (avaliableUser) {
            res.status(400);
            throw new Error("User Already Exists with this email");
      }
      //hashPassword
      const hashPassword = await bcrypt.hash(password, 10);
      // console.log(hashPassword);
      const user = await User.create({
            username, email, password: hashPassword,
      });
      res.json({status:201,msg:"User registred Successfully",newuser:{_id:user.id,username:user.username,email:user.email}})
});
//@des User login with auth
//@route  POST /api/users
//@access public
const userLogin = asyncHandler(async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
            res.status(400);
            throw new Error("All fields are Mandatory ")
      }
      const user = await User.findOne({ email });
      //compare password with hashPassword
      if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                  {
                        user: {
                              username: user.username,
                              email: user.email,
                              id: user.id,
                        }
                  },
                  process.env.ACCESS_TOKEN_SECERT,
                  { expiresIn: "15m" });
            res.status(200).json({msg:`User with Id:${user.id} Successfully logged-In`,accessToken });
      } else {
            res.status(401);
            throw new Error("Email or Password is invalid")
      }
});
//@des Current user info with auth
//@route  GET /api/users
//@access private
const currentUser = asyncHandler(async (req, res) => {
      res.json({msg:"Info related to current user", user:req.user  })
});

module.exports = { userRegistration, userLogin, currentUser };