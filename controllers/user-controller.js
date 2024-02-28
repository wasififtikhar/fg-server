const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const { userResponseHandler, tokenGenerator } = require("../utils/response-handler");
require("dotenv").config();

const UserController = {
  signUp: (req, res) => {
    const { user_name, email, password } = req.body;

    const Hashpassword = bcrypt.hashSync(password, 10);

    const objtoSend = {
      email: email,
      password: Hashpassword,
      user_name: user_name,
    };

    UserModel.findOne({ email })
      .then((user) => {
        if (user) {
            res.json(userResponseHandler("Email already exixts", false, null));
        } else {
            UserModel.create(objtoSend)
            .then((user) =>
            res.json(userResponseHandler("User Registered Successfully", true, user))
            )
            .catch((error) =>
            res.json(userResponseHandler("Internal server error", false, error))
            );
        }
       
      })
      .catch(() => userResponseHandler("Database error", false, null));


  },

    login: (req, res) => {
        const { email, password } = req.body;
        UserModel.findOne({email}).then((user) => {
            if(!user) {
                res.json(userResponseHandler(`Crediential Error`, false))
            } else {
                const isPasswordTrue = bcrypt.compareSync(password, user.password)

                if(isPasswordTrue){
                    const signdata = {
                        _id: user._id,
                        email: user.email
                    }

                    const token = tokenGenerator(signdata, "wasif12345")
                    if(!token) res.json(userResponseHandler(`Internal Server Error`, false, null))

                    res.json(userResponseHandler(`User login Successfully`, true, {...user?._doc, token}))
                    
                } else {
                    res.json(userResponseHandler(`Crediential Error`, false))
                }
            }
        })
    }
};

console.log( process.env)

module.exports = UserController;
