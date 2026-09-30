const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service")
const tokenBlackListModel = require("../models/blackList.model")
// const tokenblackListModel = require("../models/blackList.model")
// user resgister controller
// POST /api/auth/register 

async function userRegisterController(req,res){
    const { email, password , name} = req.body;

    const isExists = await userModel.findOne({
        email:email
    })

    if(isExists){
        return res.status(422).json({
            message:"Email already exists",
            status:"failed"
        })
    }

    const user = await userModel.create({
        email,password,name
    })




    
const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{ expiresIn:"7d"})
 res.cookie("token",token)
 res.status(201).json({
    message:"User registered successfully",
    user:{
        _id: user._id,
        email: user.email,
        name: user.name
    },
    token
 })
 await emailService.sendRegistrationEmail(user.email ,user.name )

    return res.status(201).json({
        message:"User registered successfully",
        status:"success",
        user
    })
    // await emailService.sendRegistrationEmail(user.email ,user.name )



// const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{ expiresIn:"7d"})
//  res.cookie("token",token)
//  res.status(201).json({
//     message:"User registered successfully",
//     user:{
//         _id: user._id,
//         email: user.email,
//         name: user.name
//     },
//     token
//  })

}



/**
 * - User Login Controller
 * - POST /api/auth/login
  */


async function userLoginController(req,res){
    const { email, password } = req.body;
    const user = await userModel.findOne({email}).select("+password") // This will include the password field in the query result
    
    if(!user)
    {
        return res.status(401).json({
            message:"Invalid email or password",
            // status:"failed"
        })
    }
const isPasswordValid = await user.comparePassword(password)

if(!isPasswordValid){
    return res.status(401).json({
        message:"Invalid email or password",
        // status:"failed"
    })
}

const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{ expiresIn:"7d"})
res.cookie("token",token)
res.status(200).json({
    message:"User logged in successfully",
    user:{
        _id: user._id,
        email: user.email,
        name: user.name
    },
    token
})

}

/**
 * - User Logout Controller
 * - POST /api/auth/logout
  */

async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}

module.exports = { userRegisterController, userLoginController ,userLogoutController}