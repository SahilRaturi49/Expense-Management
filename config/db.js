import mongoose from "mongoose"

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.) 
    } catch (error) {
        
    }
}