import mongoose from "mongoose";

 export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://akshitwakodikar:akshitwakodikar@cluster0.ppfln9p.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));
}