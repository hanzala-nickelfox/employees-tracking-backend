const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signupController = async(req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({errorServerMsg: 'Email already exists'})
        }
        const newUser = new User();
        newUser.email = email;
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();
        res.json({successServerMsg: 'User registered, please sign-in'})
    }
    catch(err){
        res.status(500).json({errorServerMsg: 'Server Error'})
    }
}

exports.signinController = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errorServerMsg: "Invalid Credentials"});
        }
        const payload = {
            user: {
                _id : user._id,
            },
        };

        await jwt.sign(payload, jwtSecret, {expiresIn: jwtExpire}, (err,token) => {
            if(err)
                console.log("Jwt Error:",err);
            
            const {_id, email} = user;
            res.json({
                token, 
                user: {_id, email},
            });
        })
    } catch(err) {
        res.status(500).json({errorServerMsg: 'Server Error'})
    }

}