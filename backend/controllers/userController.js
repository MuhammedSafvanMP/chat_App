const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

export const register = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if(!fullName || !userName || !password || !confirmPassword || !gender){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message: "Password do not match"});
        }
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({ message :"Username alredy exit try different"})
        }
        // converting hash value password 
        const hashedPassword = await bcrypt.hash(password, 10);

        await  User.create({
            fullName,
            userName,
            password: hashedPassword,
            profilePhoto,
            gender
        })

    } catch (error) {
        
    }
}