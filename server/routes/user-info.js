import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyJWT from "./../middleware/authentification-middle.js";
import User from "./../model/Users.js";
const router = express.Router();


router.get('/get-login-user-data', verifyJWT, (req, res) => {
    console.log(req)
    return res.json({
        message: "cookie deleted"
    });

});

export default router;