const nodemailer = require('nodemailer')

const createTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }

    })
}

async function sendEmail(to, subject, text) {
    try {
        const transporter = createTransporter()
         await transporter.verify(); 
        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:to,
            subject:subject,
            text:text
        })
        console.log("Email send successfully")
    } catch (err) {
        console.log(err)
    }
}

module.exports=sendEmail