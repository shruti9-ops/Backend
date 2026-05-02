const user = require('../Models/user');
const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req,res) => {
    try{
        const{name,email,password} = req.body;

        if(await user.findOne({email})){
            return res.status(400).json({message:"Email already exists"});
        }

        const hashed = await crypt.hash(password,10);
        

        const newUser = await user.create({
            name,
            email,
            password:hashed
        })

        res.status(201).json({message:"User created successfully",user:newUser});
    }
    catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }

}


exports.logIn = async (req,res) => {

    try{
        const {email,password} = req.body;


        const existUser = await user.findOne({email});
        if(!existUser){
            return res.status(400).json({message:"email not found"});
        }

        if(!await crypt.compare(password,existUser.password)){
            return res.status(400).json({message:"Invalid password"});
        }

        const jwtToken = jwt.sign({id:existUser._id,role:existUser.role},process.env.JWT_SECRET,{expiresIn:'1h'});

        res.status(200).json({message:"Login successful",token:jwtToken});
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}