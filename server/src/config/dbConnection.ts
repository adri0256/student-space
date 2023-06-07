import { connect, ConnectOptions } from "mongoose";

const connectDb = async () => {
    try {
        if (!process.env.DATABASE_URI) {
            throw new Error("DATABASE_URI not found in environment variables");
        }

        await connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);

        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDb;
