const shipmentSchema = require("../schema/shipmentSchema")
let userSchema = require("../schema/userSchema")
const vehicleSchema = require("../schema/vehicleSchema")


//GET SPECIFIC USER
exports.getUser = async (req,res)=>{
    try{
        let user =  await userSchema.findById(req.params.id) 
        res.status(200).json({
            user,
            message:"user sent"
        })
    }
    catch(e){

    }

}

//CREATE A USER

exports.createUser = async (req,res)=>{
    try{
        let newUser = await userSchema.create(req.body)
        delete newUser._doc.password

        let jwt = newUser.getJwtToken()

        return res.status(201)
        .cookie("token", jwt , 
        {
            httpOnly:true ,
            secure:true,
            sameSite:'none',
        })
        .json({
            message: `user created ` ,
            user: newUser
        })
    }
    catch(e){
        if (e.code === 11000)
        {
            res.status(400).json({
                error : "Email already exists" ,
                emailExists : true 
            })
        }
        else
        {
            res.status(400).json({
                error: e.errors
            })

        }
    }
}


//LOGIN A USER

exports.loginUser =  async (req,res)=>{
    try{

        let {email , password} = req.body

        if(!email || !password)
        {
            return res.status(400).json({
                message: "Enter email and password"
            })
  
        }

        let user = await userSchema.findOne({email})

        if(!user)
        {
            return res.status(400).json({
                message: "User not found"
            })
        }

        let isMatched = await user.comparePassword(password)

        if(!isMatched) // if password is not correct run this
        {
            return res.status(400).json({
                message: "Password or email Incorrect"
            })
        }

        delete user._doc.password
        let token = user.getJwtToken()
        return res.status(200).cookie("token", token , 
            {
                httpOnly:true ,
                secure:true,
                sameSite:'none',
            }
        )
        .json({
            user
        })
    }catch(e){
        res.status(400).json({
            error : e,
            message: "cannot login"
        })
    }
    
}


//LOGOUT USER
exports.logoutUser = async (req,res)=>{
    res.clearCookie("token")
    req.user = null
    res.status(200).json({
        message: "logged out"
    })
}


