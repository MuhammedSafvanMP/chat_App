const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


 const register = async (req, res) => {
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

        // male and female phoet API

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?userName= ${userName}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?userName= ${userName}`

        await  User.create({
            fullName,
            userName,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        })

        return res.status(201).json({message : "User created successfully", success: true})
    } catch (error) {
        console.log(error);
    }
}


// login user

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if(!userName || !password) {
            return res.status(400).json({message: "All field are required"});
        };
        const user = await User.findOne({userName});
        if(!user){
            return res.status(400).json({message: "Incrrocted username or password", success: false})
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) {
            return res.status(400).json({message: "Incorrect username or password", sucess : false})
        }

        const tokenData = { userId: user._id}
        const token = await jwt.sign(tokenData, process.env.JWT_SCRET_KEY , {expiresIn: '1d'});

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
            _id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        })
    } catch (error) {
        console.log(error);   
    }
}


module.exports = { register, login }