let mongoose = require("mongoose")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const orderItemSchema = require("./orderSchema")

let userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: [true , "Email is Required"],
        validate:{
            validator: (value)=>{
                //EMAIL VALIDATION REGEX
                return /\S+@\S+\.\S+/.test(value)
            },
            message:props=> ` invalid Email Address`
        }
    },
    password:{
        type: String,
        required: [true , 'Password is required'],
        minLength: [8 , "Password min length should be atleast 8 characters"],
        maxLength: [18, "Password max length is 18 characters"],
    },
    userType : {
        type : String ,
        enum : ['normal' , 'manager' , 'executive'] ,
        required : true
    }


})

userSchema.pre('save' , async function(){
    if(this.isModified('password'))
    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

userSchema.methods.getJwtToken =  function (){
    return  jwt.sign({id: this._id} , "pleaseDontHack" , {expiresIn: "1h"})
}

module.exports = mongoose.model("user" , userSchema)