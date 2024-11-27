import userModel from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const registerUser = async(req,res)=>{
    const {username, password, phone} = req.body;
    try {
        const phoneexist = await userModel.findOne({phone})
        const exist = await userModel.findOne({username})
        if(exist){
            return res.json({success: false, message:"UserName is already"})
        }
        if(phoneexist){
            return res.json({success: false, message:"Phone is already"})
        }
        if(phone.length < 9 || phone.length > 11){
            return res.json({success: false, message: "Phone Numebr must be between 9 and 11 digits"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            username: username,
            password: hashedPassword,
            phone: phone,
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token, userId: user._id });
    } catch (error) {
        console.log(error);
       res.json({ success: false, message: "Error" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async(req,res)=>{
    const {username, password} = req.body;
    try {
        const user = await userModel.findOne({username})
        if(!user){
            return res.json({success: false, message: "UserName is not exist"})
        }
        const isMath = await bcrypt.compare(password, user.password);
        if(!isMath){
            return res.json({success: false, message:"Wrong Password"})
        }
        const token = createToken(user._id);
        res.json({ success: true, token, userId: user._id })   
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Login Fail" })
    }
 
}

const forgetPassword = async (req, res) => {
    const { username, phone, newPassword } = req.body;
    try {
        if (!newPassword) {
            return res.json({ success: false, message: "New password is required" });
        }

        const user = await userModel.findOne({ username, phone });
        if (!user) {
            return res.json({ success: false, message: "Username or Phone is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to update password" });
    }
};

const getUserInfo = async (req, res) => {
    const { userId } = req.body; // Đảm bảo rằng userId đã được xác thực qua middleware auth
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
      res.json({ success: true, username: user.username });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching user info" });
    }
  };



export {registerUser, loginUser,forgetPassword,getUserInfo}