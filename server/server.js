import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./model/Users.js"
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://heinz:kDtQbxdGQ1rHAyIX@cluster0.0owglf4.mongodb.net/tripCollection");


app.post("/register", async (req, res) => {
    const user = req.body;

    const takenUserName = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenUserName || takenEmail) {
        res.json({ message: "Email has already been taken" });
    } else {
        user.password = await bcrypt.hash(req.body.password, 10);
        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })
        dbUser.save();
        res.json({ message: "success!" })
    }

});


app.post("/login", (req, res) => {
    const userLoggingIn = req.body;
    console.log(userLoggingIn)
    User.findOne({ username: userLoggingIn.username })
        .then(dbUser => {
            if (!dbUser) {
                return res.json({ message: "Invalid Username or Password" });
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            username: dbUser.username
                        }

                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            { expiresIn: 86400 },
                            (err, token) => {
                                console.log("err", err)
                                console.log("secret", process.env.JWT_SECRET)
                                if (err) return res.json({ message: "err" });
                                return res.json({
                                    message: "Success",
                                    token: "Bearer " + token
                                })
                            }
                        )
                    } else {
                        return res.json({
                            message: "InvalidUsername or password"
                        });
                    }
                })
        })
});

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.json({
                    isLoggedIn: false,
                    message: "Failed to Authnticate"
                })
            }
            req.user = {};
            req.user.id = decode.id;
            req.user.username = decode.username;
        })
        next();
    } else {
        res.json({ message: "Incorrect token", isLoggedIn: false })
    }

}

app.get("/get-user-name", verifyJWT, (req, res) => {
    console.log("req.user")
    console.log(req.user)
    res.json({ isLoggedIn: true, username: req.user.username })
})

const port = 9002;
app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));
