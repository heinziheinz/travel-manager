import jwt from "jsonwebtoken";

function verifyJWT(req, res, next) {
    // const token = req.headers["x-access-token"]?.split(' ')[1];
    const token = req.cookies.session?.split(' ')[1];

    // var cookie = req.cookies.cookieName;
    console.log("req.cookies.session")
    console.log(req.cookies)
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, { clockTolerance: 0 }, (err, decode) => {
            if (err) {
                return res.json({
                    isLoggedIn: false,
                    message: "Failed to Authnticate"
                })
            }
            req.user = {};
            req.user.id = decode.id;
            req.user.username = decode.username;
            const payload = {
                id: decode.id,
                username: decode.username
            }

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 6000 },
                (err, newtoken) => {
                    if (err) return res.json({ message: "err" });
                    res.cookie('session', "Bearer " + newtoken, { domain: "127.0.0.1" });
                    next();
                }
            )
        })
        // next();
    } else {
        res.json({ message: "Incorrect token", isLoggedIn: false })
    }

}

export default verifyJWT;