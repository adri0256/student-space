import express, { Express, urlencoded } from "express";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions.js";
import cors from "cors";
import { logger } from "./middleware/logEvents.js";
import errorHandler from "./middleware/errorHandler.js";
import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials.js";
import mongoose from "mongoose";
import connectDb from "./config/dbConnection.js";
import path from "path";

import rootRouter from "./routes/root.js";
import registerRouter from "./routes/register.js";
import authRouter from "./routes/auth.js";
import logoutRouter from "./routes/logout.js";
import refreshRouter from "./routes/refresh.js";
import userApiRouter from "./routes/api/users.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDb();

// setup middlewares
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// setup routes
app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);

app.use(verifyJWT);

app.use("/users", userApiRouter);

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(path.resolve(), "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
