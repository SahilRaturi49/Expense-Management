import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    const {name, email, password} = req.body;

    try {
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        res.status(201).json({ token });
    } catch (error) {
        res.status(201).json({ token });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
      
    try {
    // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
          }
      
          // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
      
        // Generate JWT token
        const token = generateToken(user._id);
      
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};