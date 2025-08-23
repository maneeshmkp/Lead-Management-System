import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";


export const register = async (req, res) =>{
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try{
        const user = await prisma.user.create({
            data: {
                email, password: hashed
            }
        });

        req.status(201).json({message: "User registered", userId: user.id});
    } catch(err) {
        res.status(400).json({message: "Email already exists"});
    }

};


export const login = async (req, res) =>{
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({where: {email}});
    
    if(!user) return res.status(401).json({message: "Invalid credentials"});


    const valid = await bcrypt.compare(password, user.password);

    if(!valid) return res.status(401).json({message: "Invalid credentials "});

    const token = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.cookie("token", token, {httpOnly: true, secure: false});
    res.json({message: "Login succeeful"});
};


export const logout = (req, res) =>{
    res.clearCookie("token");
    res.json({message: "Logged out"});
};