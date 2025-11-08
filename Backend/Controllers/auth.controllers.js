import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../Config/token.js';



//1 SignUP
export const signUp=async (req, res) => {
    try{
        //taking user data from request body
        const{firstname, lastname, email, password,username} = req.body;
        //all field must required
        if(!firstname || !lastname || !email || !password || !username){
            return res.status(400).json({message:"All fields are required"});   
        }
        // Prevent signup as police via public signup endpoint
        const POLICE_ID = process.env.POLICE_ID || '2315001656';
        if (
            username === POLICE_ID ||
            email === POLICE_ID ||
            (typeof username === 'string' && username.toLowerCase() === 'police') ||
            (typeof email === 'string' && email.toLowerCase() === 'police')
        ) {
            return res.status(400).json({ message: 'Cannot signup as police through this endpoint' });
        }
        //check user already exist or not
        const existinguser=await User.findOne({email});
        if(existinguser){
            return res.status(400).json({message:"User already exists"});
        }
        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        //creat user
        const user = await User.create({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword,
            role: 'user'

        });
        //generate token
        let token=await generateToken(user._id);
        //token ko cookie ma store krna
        //cookie ma store krne se user ko login krne ki zarurat nahi hoti
        const isProd = process.env.NODE_ENV === 'production';
        res.cookie("token",token,{
            httpOnly:true,
            secure:isProd,
            sameSite:isProd ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days din k baad y cookies expire ho jayegi
        })

        //return response
        return res.status(201).json({message:"User created successfully", user:{firstname, lastname, email, username, role: user.role
        }});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }   
}

//2 LOGIN
export const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate input
        if (!password || (!username && !email)) {
            return res.status(400).json({ message: "Username/Email and password are required" });
        }
        // Special-case: police login with fixed credentials (no signup)
        const POLICE_ID = process.env.POLICE_ID || '2315001656';
        const POLICE_PWD = process.env.POLICE_PWD || 'gla-police';

        if ((username && username.toString() === POLICE_ID) || (email && email.toString() === POLICE_ID)) {
            // Authenticate against fixed police credentials
            if (password !== POLICE_PWD) {
                return res.status(400).json({ message: 'Wrong Password' });
            }
            // generate a token for a pseudo-police user
            const token = await generateToken('police-officer');
            const isProd = process.env.NODE_ENV === 'production';
            res.cookie("token", token, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? "None" : "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json({ message: 'Login successful', role: 'police', user: { username: POLICE_ID, role: 'police' } });
        }

        // Find user by either username or email
        let existingUser;
        if (username) {
            existingUser = await User.findOne({ username });
        } else {
            existingUser = await User.findOne({ email });
        }
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check password
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            return res.status(400).json({ message: "Wrong Password" });
        }
        // Generate token
        const token = await generateToken(existingUser._id);
        // Set cookie
        const isProd = process.env.NODE_ENV === 'production';
        res.cookie("token", token, {
            httpOnly: true,
             secure:isProd,
            sameSite:isProd ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                firstname: existingUser.firstname,
                lastname: existingUser.lastname,
                email: existingUser.email,
                username: existingUser.username,
                role: existingUser.role || 'user'
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//3 LOGOUT
export const logout=async(req,res)=>{
    try{
        const isProd = process.env.NODE_ENV === 'production';
        const cookieOptions = {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "None" : "Strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };
        if(isProd){
            cookieOptions.sameSite = "None";
        }
        res.cookie("token", "", cookieOptions);
        res.clearCookie("token", cookieOptions);
        return res.status(200).json({message:"User logged out successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
