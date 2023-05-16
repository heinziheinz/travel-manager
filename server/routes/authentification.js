import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyJWT from "./../middleware/authentification-middle.js";
import User from "./../model/Users.js";
const router = express.Router();

router.post("/register", async (req, res) => {
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

router.post("/login", (req, res) => {
    const userLoggingIn = req.body;
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
                            { expiresIn: 6000 },
                            (err, token) => {
                                console.log("err", err)
                                console.log("secret", process.env.JWT_SECRET)
                                if (err) return res.json({ message: "err" });

                                res.cookie('session', "Bearer " + token, { domain: "127.0.0.1" })
                                return res.json({
                                    message: "Success",
                                    token: "Bearer " + token
                                });
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

router.get("/get-user-name", verifyJWT, (req, res) => {
    console.log("req.user")
    console.log(req.user)
    res.json({ isLoggedIn: true, username: req.user.username })
});

router.get('/delete-cookie', verifyJWT, (req, res) => {

    res.clearCookie('session');
    return res.json({
        message: "cookie deleted"
    });

});

export default router;