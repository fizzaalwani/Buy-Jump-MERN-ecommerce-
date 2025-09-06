const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    let token = req.header('auth-token')
    // console.log("---------------------------------")
    // console.log("Token from header:", req.header('auth-token'));
    if (!token) return res.status(401).send({ errors: "Please authenticate yourself" })

    try {
        let decoded = jwt.verify(token, "secret")
        console.log(decoded)
        req.user = decoded.user
        next();
    } catch (err) {
        return res.status(401).send({ errors: "Please authenticate yourself not decoded" })
    }
}
module.exports=verifyUser