
import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || "";


export async function DbConnect() {
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

const db = mongoose.connection;

db.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

// db.once("open", () => {
//     console.log("Connected to MongoDB!");
// });
}