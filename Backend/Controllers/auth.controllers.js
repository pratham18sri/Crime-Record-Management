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
        let token = await generateToken(user._id);
        // compute cookie options to allow cross-site cookies when deployed
        const isProd = process.env.NODE_ENV === 'production';
        const forceCrossSite = !!process.env.CLIENT_URL || process.env.FORCE_COOKIE_NONE === 'true';
        const cookieSameSite = (isProd || forceCrossSite) ? 'None' : 'Lax';
        const cookieSecure = (isProd || forceCrossSite) ? true : false;
        res.cookie("token", token, {
            httpOnly: true,
            secure: cookieSecure,
            sameSite: cookieSameSite,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        console.log('Set-Cookie on signup:', { sameSite: cookieSameSite, secure: cookieSecure });

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
            const isProdLocal = process.env.NODE_ENV === 'production';
            const forceCrossSiteLocal = !!process.env.CLIENT_URL || process.env.FORCE_COOKIE_NONE === 'true';
            const cookieSameSiteLocal = (isProdLocal || forceCrossSiteLocal) ? 'None' : 'Lax';
            const cookieSecureLocal = (isProdLocal || forceCrossSiteLocal) ? true : false;
            res.cookie("token", token, {
                httpOnly: true,
                secure: cookieSecureLocal,
                sameSite: cookieSameSiteLocal,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            console.log('Set-Cookie on police login:', { sameSite: cookieSameSiteLocal, secure: cookieSecureLocal });
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
        // Set cookie with cross-site options when appropriate
        const isProd2 = process.env.NODE_ENV === 'production';
        const forceCrossSite2 = !!process.env.CLIENT_URL || process.env.FORCE_COOKIE_NONE === 'true';
        const cookieSameSite2 = (isProd2 || forceCrossSite2) ? 'None' : 'Lax';
        const cookieSecure2 = (isProd2 || forceCrossSite2) ? true : false;
        res.cookie("token", token, {
            httpOnly: true,
            secure: cookieSecure2,
            sameSite: cookieSameSite2,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        console.log('Set-Cookie on user login:', { sameSite: cookieSameSite2, secure: cookieSecure2 });
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
        const isProd3 = process.env.NODE_ENV === 'production';
        const forceCrossSite3 = !!process.env.CLIENT_URL || process.env.FORCE_COOKIE_NONE === 'true';
        const cookieSameSite3 = (isProd3 || forceCrossSite3) ? 'None' : 'Strict';
        const cookieSecure3 = (isProd3 || forceCrossSite3) ? true : false;
        const cookieOptions = {
            httpOnly: true,
            secure: cookieSecure3,
            sameSite: cookieSameSite3,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };
        res.cookie("token", "", cookieOptions);
        res.clearCookie("token", cookieOptions);
        console.log('Cleared token cookie on logout:', { sameSite: cookieSameSite3, secure: cookieSecure3 });
        return res.status(200).json({message:"User logged out successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
