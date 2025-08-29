const usermodel=require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup= async (req, res) => {
    try {
        const { username, email, password } = req.body
        let check = await usermodel.findOne({ email: email })
        if (check) return res.status(400).json({ success: false, message: "User already exists" })

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await usermodel.create({
            username: username,
            email: email,
            password: hashedPassword,
            cartData: {}
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, "secret")

        res.status(201).json({
            success: true,
            token,
            message: "User registered successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message || "Error registering user"
        })
    }

}

module.exports.login=async (req, res) => {

    let existingUser = await usermodel.findOne({ email: req.body.email })
    if (!existingUser) return res.status(401).json({ success: true, message: "User does not exist" })

    let isPasswordValid = bcrypt.compareSync(req.body.password, existingUser.password)
    if (isPasswordValid) {
        const data = {
            user: {
                id: existingUser.id
            }
        }
        const token = jwt.sign(data, "secret")

        res.json({
            success: true,
            token,
            message: "User loggedin successfully"
        })
    } else {
        res.json({
            success: false,
            message: "wrong password"
        })
    }
}